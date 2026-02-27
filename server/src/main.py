
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
<<<<<<< HEAD
from .routers import admin
from . import database
from . import models
from sqlalchemy.orm import Session

app = FastAPI(title="Insurance CRC Admin API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://10.24.107.34:3000",
]
=======
from src.database.core import Base, engine
from src.auth.controller import router as auth_router
from src.users.controller import router as users_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
>>>>>>> main-group-A

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD
# Initialize database
models.Base.metadata.create_all(bind=database.engine)


def populate_sample_data():
    """Populate database with realistic insurance data"""
    db = database.SessionLocal()
    try:
        # Check if data already exists
        if db.query(models.User).count() > 0:
            return
        
        # Add realistic insurance policyholders
        users = [
            {"name": "Rajesh Kumar", "email": "rajesh.kumar@email.com", "status": "Active"},
            {"name": "Priya Singh", "email": "priya.singh@email.com", "status": "Active"},
            {"name": "Amit Patel", "email": "amit.patel@email.com", "status": "Active"},
            {"name": "Neha Sharma", "email": "neha.sharma@email.com", "status": "Inactive"},
            {"name": "Vikram Desai", "email": "vikram.desai@email.com", "status": "Active"},
            {"name": "Anjali Reddy", "email": "anjali.reddy@email.com", "status": "Active"},
            {"name": "Sanjay Gupta", "email": "sanjay.gupta@email.com", "status": "Active"},
            {"name": "Kavita Iyer", "email": "kavita.iyer@email.com", "status": "Active"},
            {"name": "Rahul Mehta", "email": "rahul.mehta@email.com", "status": "Active"},
            {"name": "Deepa Nair", "email": "deepa.nair@email.com", "status": "Inactive"},
        ]
        
        for user_data in users:
            user = models.User(**user_data)
            db.add(user)
        
        # Add realistic fraud detection rules
        fraud_rules = [
            {
                "name": "Multiple Claims Same Period",
                "description": "Flags policyholders submitting multiple high-value claims within 30 days",
                "priority": "High",
                "status": "Active"
            },
            {
                "name": "Claim Amount Exceeds Policy Limit",
                "description": "Detects claims where requested amount is significantly higher than policy coverage",
                "priority": "High",
                "status": "Active"
            },
            {
                "name": "Suspicious Medical Bills",
                "description": "Identifies medical claims with unusual billing patterns or unverified providers",
                "priority": "Medium",
                "status": "Active"
            },
            {
                "name": "Vehicle Damage Inconsistency",
                "description": "Checks if reported vehicle damage matches accident description",
                "priority": "High",
                "status": "Active"
            },
            {
                "name": "Pre-existing Condition Claim",
                "description": "Flags health insurance claims for conditions that existed before policy activation",
                "priority": "Medium",
                "status": "Active"
            },
            {
                "name": "Document Forgery Detection",
                "description": "Uses AI to detect forged or manipulated claim documents and receipts",
                "priority": "High",
                "status": "Active"
            },
            {
                "name": "Beneficiary Pattern Analysis",
                "description": "Monitors unusual patterns in life insurance beneficiary claims",
                "priority": "Low",
                "status": "Active"
            },
            {
                "name": "Property Over-valuation",
                "description": "Detects property insurance claims with inflated property values",
                "priority": "Medium",
                "status": "Active"
            },
            {
                "name": "Late Claim Reporting",
                "description": "Flags claims reported significantly after the incident date",
                "priority": "Low",
                "status": "Inactive"
            },
            {
                "name": "Third-Party Involvement",
                "description": "Identifies suspicious third-party involvement in claim submissions",
                "priority": "Medium",
                "status": "Active"
            },
        ]
        
        for rule_data in fraud_rules:
            rule = models.FraudRule(**rule_data)
            db.add(rule)
        
        # Add realistic insurance claims
        claims = [
            {
                "claim_id": "ICRC-2026-001",
                "claimant": "Rajesh Kumar",
                "amount": "₹1,85,000",
                "status": "Approved",
                "date": "Feb 15, 2026",
                "claim_type": "Auto Insurance",
                "priority": "High"
            },
            {
                "claim_id": "ICRC-2026-002",
                "claimant": "Priya Singh",
                "amount": "₹45,500",
                "status": "Under Review",
                "date": "Feb 18, 2026",
                "claim_type": "Health Insurance",
                "priority": "Medium"
            },
            {
                "claim_id": "ICRC-2026-003",
                "claimant": "Amit Patel",
                "amount": "₹3,25,000",
                "status": "Pending",
                "date": "Feb 20, 2026",
                "claim_type": "Property Insurance",
                "priority": "High"
            },
            {
                "claim_id": "ICRC-2026-004",
                "claimant": "Neha Sharma",
                "amount": "₹22,800",
                "status": "Rejected",
                "date": "Feb 12, 2026",
                "claim_type": "Travel Insurance",
                "priority": "Low"
            },
            {
                "claim_id": "ICRC-2026-005",
                "claimant": "Vikram Desai",
                "amount": "₹2,15,000",
                "status": "Approved",
                "date": "Feb 10, 2026",
                "claim_type": "Auto Insurance",
                "priority": "High"
            },
            {
                "claim_id": "ICRC-2026-006",
                "claimant": "Anjali Reddy",
                "amount": "₹68,900",
                "status": "Approved",
                "date": "Feb 08, 2026",
                "claim_type": "Health Insurance",
                "priority": "Medium"
            },
            {
                "claim_id": "ICRC-2026-007",
                "claimant": "Sanjay Gupta",
                "amount": "₹1,45,000",
                "status": "Under Review",
                "date": "Feb 22, 2026",
                "claim_type": "Life Insurance",
                "priority": "High"
            },
            {
                "claim_id": "ICRC-2026-008",
                "claimant": "Kavita Iyer",
                "amount": "₹35,200",
                "status": "Approved",
                "date": "Feb 05, 2026",
                "claim_type": "Health Insurance",
                "priority": "Low"
            },
            {
                "claim_id": "ICRC-2026-009",
                "claimant": "Rahul Mehta",
                "amount": "₹4,50,000",
                "status": "Under Review",
                "date": "Feb 24, 2026",
                "claim_type": "Property Insurance",
                "priority": "High"
            },
            {
                "claim_id": "ICRC-2026-010",
                "claimant": "Deepa Nair",
                "amount": "₹18,500",
                "status": "Rejected",
                "date": "Feb 14, 2026",
                "claim_type": "Travel Insurance",
                "priority": "Low"
            },
            {
                "claim_id": "ICRC-2026-011",
                "claimant": "Rajesh Kumar",
                "amount": "₹92,000",
                "status": "Pending",
                "date": "Feb 25, 2026",
                "claim_type": "Health Insurance",
                "priority": "Medium"
            },
            {
                "claim_id": "ICRC-2026-012",
                "claimant": "Priya Singh",
                "amount": "₹1,75,000",
                "status": "Approved",
                "date": "Feb 03, 2026",
                "claim_type": "Auto Insurance",
                "priority": "High"
            },
        ]
        
        for claim_data in claims:
            claim = models.Claim(**claim_data)
            db.add(claim)
        
        # Add analytics data (monthly claim statistics)
        analytics_data = [
            {"month": "Jan", "claims": 78},
            {"month": "Feb", "claims": 65},
            {"month": "Mar", "claims": 82},
            {"month": "Apr", "claims": 71},
            {"month": "May", "claims": 89},
            {"month": "Jun", "claims": 76},
        ]
        
        for data in analytics_data:
            stat = models.ClaimStats(**data)
            db.add(stat)
        
        db.commit()
        print("✓ Sample insurance data populated successfully")
        
    except Exception as e:
        print(f"✗ Error populating sample data: {e}")
        db.rollback()
    finally:
        db.close()


@app.on_event("startup")
async def startup_event():
    """Run on application startup"""
    populate_sample_data()


# Include routers
app.include_router(admin.router)


@app.get("/health")
def health_check():
    return {"status": "Backend is running"}
=======
app.include_router(auth_router)
app.include_router(users_router)
>>>>>>> main-group-A

@app.get("/")
def root():
    return {"message": "FastAPI running"}
