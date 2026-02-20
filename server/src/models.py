from sqlalchemy import Column, Integer, String, Boolean
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    status = Column(String, default="Active")


class FraudRule(Base):
    __tablename__ = "fraud_rules"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)


class ClaimStats(Base):
    __tablename__ = "claim_stats"

    id = Column(Integer, primary_key=True, index=True)
    month = Column(String, nullable=False)
    claims = Column(Integer, default=0)


class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(String, unique=True, nullable=False)
    claimant = Column(String, nullable=False)
    amount = Column(String, nullable=False)
    status = Column(String, default="Pending")
    date = Column(String, nullable=False)
    claim_type = Column(String, nullable=False)
    priority = Column(String, default="Low")
