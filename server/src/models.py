from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.dialects.postgresql import ARRAY
from .database import Base

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    title = Column(String)
    provider = Column(String)
    match = Column(Integer)
    reason = Column(Text)
    coverage = Column(String)
    premium = Column(String)
    claim_ratio = Column(String) # Matches pgAdmin 'claim_ratio'
    risk_level = Column(String)  # Matches pgAdmin 'risk_level'
    tags = Column(ARRAY(String)) # Matches pgAdmin 'tags'