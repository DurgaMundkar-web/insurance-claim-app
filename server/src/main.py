from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import router
from typing import List, Dict

app = FastAPI()

# CORS CONFIG
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)app.include_router(router)

policies: List[Dict] = [
    {
        "id": 1,
        "name": "Comprehensive Health Insurance",
        "provider": "HDFC Ergo",
        "coverage": "₹10,00,000",
        "premium": "₹12,000/year",
        "features": ["Cashless Claims", "No Room Rent Limit", "Pre & Post Hospitalization"]
    },
    {
        "id": 2,
        "name": "Family Health Shield",
        "provider": "Star Health",
        "coverage": "₹15,00,000",
        "premium": "₹18,500/year",
        "features": ["Family Floater", "Maternity Cover", "Annual Health Checkup"]
    },
    {
        "id": 3,
        "name": "Senior Citizen Health Plus",
        "provider": "Max Bupa",
        "coverage": "₹5,00,000",
        "premium": "₹25,000/year",
        "features": ["No Age Limit", "Pre-existing Disease Cover", "Home Care Treatment"]
    },
    {
        "id": 4,
        "name": "Premium Life Cover",
        "provider": "ICICI Prudential",
        "coverage": "₹50,00,000",
        "premium": "₹15,000/year",
        "features": ["Accidental Death Benefit", "Critical Illness Rider", "Tax Benefits"]
    },
    {
        "id": 5,
        "name": "Motor Complete Protection",
        "provider": "Bajaj Allianz",
        "coverage": "₹8,00,000",
        "premium": "₹8,500/year",
        "features": ["Zero Depreciation", "Engine Protection", "Roadside Assistance"]
    },
    {
        "id": 6,
        "name": "Home Shield Insurance",
        "provider": "Reliance General",
        "coverage": "₹25,00,000",
        "premium": "₹6,000/year",
        "features": ["Fire & Burglary", "Natural Calamity Cover", "Electronic Equipment"]
    },
    {
        "id": 7,
        "name": "Travel Smart Plan",
        "provider": "Tata AIG",
        "coverage": "₹10,00,000",
        "premium": "₹7,500/year",
        "features": ["Medical Emergencies Abroad", "Lost Baggage Cover", "Trip Cancellation"]
    },
    {
        "id": 8,
        "name": "Business Liability Cover",
        "provider": "SBI General",
        "coverage": "₹1,00,00,000",
        "premium": "₹30,000/year",
        "features": ["Third-Party Liability", "Legal Expenses", "Employee Safety Cover"]
    }
]

# Root route
@app.get("/")
def root():
    return {"message": "Backend is running!"}

# Get all policies
@app.get("/policies")
def get_policies():
    return {"policies": policies}

# Get a single policy by ID
@app.get("/policies/{policy_id}")
def get_policy(policy_id: int):
    policy = next((p for p in policies if p["id"] == policy_id), None)
    if policy:
        return {"policy": policy}
    return {"error": "Policy not found"}