from pydantic import BaseModel, EmailStr
from typing import Optional, Dict


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    pass


class UserResponse(UserBase):
    id: int
    status: str

    class Config:
        from_attributes = True


class FraudRuleBase(BaseModel):
    name: str
    description: str
    priority: Optional[str] = "Medium"
    status: Optional[str] = "Active"


class FraudRuleCreate(FraudRuleBase):
    pass


class FraudRuleUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None


class FraudRuleResponse(FraudRuleBase):
    id: int

    class Config:
        from_attributes = True


class ClaimBase(BaseModel):
    claim_id: str
    claimant: str
    amount: str
    status: str
    date: str
    claim_type: str
    priority: str


class ClaimCreate(ClaimBase):
    pass


class ClaimResponse(ClaimBase):
    id: int

    class Config:
        from_attributes = True


class ClaimStatsResponse(BaseModel):
    month: str
    claims: int

    class Config:
        from_attributes = True


class OverviewStats(BaseModel):
    total_users: int
    active_policies: int
    claims: int
    fraud_alerts: int


class ComprehensiveAnalytics(BaseModel):
    # Claim statistics
    total_claims: int
    approved_claims: int
    pending_claims: int
    rejected_claims: int
    under_review_claims: int
    
    # Metrics
    average_claim_amount: float
    approval_rate: float
    fraud_rate: float
    
    # Distribution by type
    claims_by_type: Dict[str, int]
    
    # Distribution by priority
    claims_by_priority: Dict[str, int]
