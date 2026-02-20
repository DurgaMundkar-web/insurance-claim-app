from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import database
from .. import models
from .. import schemas

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("", include_in_schema=False)
def admin_root():
    return {
        "message": "Admin API is running. Use /admin/overview, /admin/users, /admin/fraud-rules, /admin/analytics",
    }


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ============================================
# OVERVIEW ENDPOINT
# ============================================
@router.get("/overview", response_model=schemas.OverviewStats)
def get_overview(db: Session = Depends(get_db)):
    """Get overview statistics for admin dashboard"""
    try:
        total_users = db.query(models.User).count()
        active_users = db.query(models.User).filter(models.User.status == "Active").count()
        total_claims = db.query(models.Claim).count()  # Fixed: Count actual claims, not ClaimStats
        fraud_alerts = db.query(models.FraudRule).count()

        return {
            "total_users": total_users,
            "active_policies": active_users,
            "claims": total_claims,
            "fraud_alerts": fraud_alerts,
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching overview: {str(e)}",
        )


# ============================================
# USER ENDPOINTS
# ============================================
@router.get("/users", response_model=List[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    """Get all users"""
    try:
        users = db.query(models.User).all()
        return users
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching users: {str(e)}",
        )


@router.post("/users", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Create a new user"""
    try:
        # Check if user with email already exists
        existing_user = db.query(models.User).filter(models.User.email == user.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists",
            )

        db_user = models.User(**user.model_dump())
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user: {str(e)}",
        )


@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete a user by ID"""
    try:
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        db.delete(user)
        db.commit()
        return None
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting user: {str(e)}",
        )


@router.put("/users/{user_id}/toggle-status", response_model=schemas.UserResponse)
def toggle_user_status(user_id: int, db: Session = Depends(get_db)):
    """Toggle user status between Active and Inactive"""
    try:
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        user.status = "Inactive" if user.status == "Active" else "Active"
        db.commit()
        db.refresh(user)
        return user
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error toggling user status: {str(e)}",
        )


# ============================================
# FRAUD RULE ENDPOINTS
# ============================================
@router.get("/fraud-rules", response_model=List[schemas.FraudRuleResponse])
def get_fraud_rules(db: Session = Depends(get_db)):
    """Get all fraud rules"""
    try:
        rules = db.query(models.FraudRule).all()
        return rules
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching fraud rules: {str(e)}",
        )


@router.post("/fraud-rules", response_model=schemas.FraudRuleResponse, status_code=status.HTTP_201_CREATED)
def create_fraud_rule(rule: schemas.FraudRuleCreate, db: Session = Depends(get_db)):
    """Create a new fraud rule"""
    try:
        db_rule = models.FraudRule(**rule.model_dump())
        db.add(db_rule)
        db.commit()
        db.refresh(db_rule)
        return db_rule
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating fraud rule: {str(e)}",
        )


@router.delete("/fraud-rules/{rule_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_fraud_rule(rule_id: int, db: Session = Depends(get_db)):
    """Delete a fraud rule by ID"""
    try:
        rule = db.query(models.FraudRule).filter(models.FraudRule.id == rule_id).first()
        if not rule:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Fraud rule not found",
            )

        db.delete(rule)
        db.commit()
        return None
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting fraud rule: {str(e)}",
        )


# ============================================
# CLAIMS ENDPOINT
# ============================================
@router.get("/claims", response_model=List[schemas.ClaimResponse])
def get_claims(db: Session = Depends(get_db)):
    """Get all claims"""
    try:
        claims = db.query(models.Claim).all()
        
        # If no claims exist, create sample claims
        if not claims:
            sample_claims = [
                {
                    "claim_id": "CLM-001",
                    "claimant": "Rajesh Kumar",
                    "amount": "₹45,000",
                    "status": "Approved",
                    "date": "Feb 18, 2026",
                    "claim_type": "Auto",
                    "priority": "High",
                },
                {
                    "claim_id": "CLM-002",
                    "claimant": "Priya Singh",
                    "amount": "₹28,500",
                    "status": "Pending",
                    "date": "Feb 17, 2026",
                    "claim_type": "Health",
                    "priority": "Medium",
                },
                {
                    "claim_id": "CLM-003",
                    "claimant": "Amit Patel",
                    "amount": "₹62,300",
                    "status": "Under Review",
                    "date": "Feb 16, 2026",
                    "claim_type": "Property",
                    "priority": "High",
                },
                {
                    "claim_id": "CLM-004",
                    "claimant": "Neha Sharma",
                    "amount": "₹15,800",
                    "status": "Rejected",
                    "date": "Feb 15, 2026",
                    "claim_type": "Travel",
                    "priority": "Low",
                },
                {
                    "claim_id": "CLM-005",
                    "claimant": "Vikram Desai",
                    "amount": "₹91,200",
                    "status": "Approved",
                    "date": "Feb 14, 2026",
                    "claim_type": "Auto",
                    "priority": "High",
                },
            ]
            
            for claim_data in sample_claims:
                claim = models.Claim(**claim_data)
                db.add(claim)
            
            db.commit()
            claims = db.query(models.Claim).all()
        
        return claims
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching claims: {str(e)}",
        )


@router.post("/claims", response_model=schemas.ClaimResponse, status_code=status.HTTP_201_CREATED)
def create_claim(claim: schemas.ClaimCreate, db: Session = Depends(get_db)):
    """Create a new claim"""
    try:
        db_claim = models.Claim(**claim.model_dump())
        db.add(db_claim)
        db.commit()
        db.refresh(db_claim)
        return db_claim
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating claim: {str(e)}",
        )


@router.delete("/claims/{claim_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_claim(claim_id: int, db: Session = Depends(get_db)):
    """Delete a claim by ID"""
    try:
        claim = db.query(models.Claim).filter(models.Claim.id == claim_id).first()
        if not claim:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Claim not found",
            )

        db.delete(claim)
        db.commit()
        return None
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting claim: {str(e)}",
        )


# ============================================
# ANALYTICS ENDPOINT
# ============================================
@router.get("/analytics/comprehensive", response_model=schemas.ComprehensiveAnalytics)
def get_comprehensive_analytics(db: Session = Depends(get_db)):
    """Get comprehensive analytics calculated from actual claims data"""
    try:
        all_claims = db.query(models.Claim).all()
        
        if not all_claims:
            # Return zeros if no claims
            return {
                "total_claims": 0,
                "approved_claims": 0,
                "pending_claims": 0,
                "rejected_claims": 0,
                "under_review_claims": 0,
                "average_claim_amount": 0,
                "approval_rate": 0,
                "fraud_rate": 0,
                "claims_by_type": {},
                "claims_by_priority": {}
            }
        
        # Calculate statistics
        total_claims = len(all_claims)
        approved_claims = sum(1 for c in all_claims if c.status == "Approved")
        pending_claims = sum(1 for c in all_claims if c.status == "Pending")
        rejected_claims = sum(1 for c in all_claims if c.status == "Rejected")
        under_review_claims = sum(1 for c in all_claims if c.status == "Under Review")
        
        # Calculate average claim amount (remove ₹ and commas)
        amounts = []
        for claim in all_claims:
            try:
                # Extract numeric value from amount string like "₹45,000"
                numeric_amount = float(claim.amount.replace("₹", "").replace(",", ""))
                amounts.append(numeric_amount)
            except:
                pass
        
        average_amount = sum(amounts) / len(amounts) if amounts else 0
        
        # Calculate rates
        approval_rate = (approved_claims / total_claims * 100) if total_claims > 0 else 0
        fraud_rate = (rejected_claims / total_claims * 100) if total_claims > 0 else 0
        
        # Distribution by type
        claims_by_type = {}
        for claim in all_claims:
            claim_type = claim.claim_type
            claims_by_type[claim_type] = claims_by_type.get(claim_type, 0) + 1
        
        # Distribution by priority
        claims_by_priority = {}
        for claim in all_claims:
            priority = claim.priority
            claims_by_priority[priority] = claims_by_priority.get(priority, 0) + 1
        
        return {
            "total_claims": total_claims,
            "approved_claims": approved_claims,
            "pending_claims": pending_claims,
            "rejected_claims": rejected_claims,
            "under_review_claims": under_review_claims,
            "average_claim_amount": round(average_amount, 2),
            "approval_rate": round(approval_rate, 2),
            "fraud_rate": round(fraud_rate, 2),
            "claims_by_type": claims_by_type,
            "claims_by_priority": claims_by_priority
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching comprehensive analytics: {str(e)}",
        )


@router.get("/analytics", response_model=List[schemas.ClaimStatsResponse])
def get_analytics(db: Session = Depends(get_db)):
    """Get analytics data for claims per month"""
    try:
        stats = db.query(models.ClaimStats).all()
        
        # If no data exists, create sample data
        if not stats:
            sample_data = [
                {"month": "Jan", "claims": 45},
                {"month": "Feb", "claims": 52},
                {"month": "Mar", "claims": 38},
                {"month": "Apr", "claims": 61},
                {"month": "May", "claims": 48},
                {"month": "Jun", "claims": 55},
            ]
            
            for data in sample_data:
                claim_stat = models.ClaimStats(**data)
                db.add(claim_stat)
            
            db.commit()
            stats = db.query(models.ClaimStats).all()
        
        return stats
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching analytics: {str(e)}",
        )
