# 🌱 ShetiMitra (शेतीमित्र)
> **Empowering Farmers with Real-Time Economics, Live Mandi Rates & AI Agronomy**

ShetiMitra is a comprehensive digital agriculture platform tailored for farmers across Maharashtra and India. It bridges the critical information gap in farming by helping growers accurately calculate their true per-kilogram production cost, track live APMC market rates, connect directly with verified corporate buyers & exporters, and access real-time crop disease remedies through an AI Agronomist in Marathi, Hindi, and English.

---

## 📸 Screenshots & Previews

<div align="center">

### 1. Farmer Smart Dashboard
*Overview of farm economics, live modal rates, crop stage tracking, and weather advisories.*
![ShetiMitra Dashboard](screenshots/dashboard.png)

<br/>

### 2. Live APMC Mandi Intelligence & Price Tracking
*Real-time prices from Pimpalgaon, Tasgaon, Solapur, and Pune APMC markets.*
![Market Intelligence](screenshots/market.png)

<br/>

### 3. Smart Selling Decision Engine & Net Realization
*Compare APMC realization vs. direct farm-gate exporter pickup to maximize profit.*
![Selling Decision](screenshots/selling_decision.png)

<br/>

### 4. 24/7 Multilingual AI Agronomist (AI शेतीमित्र)
*Ask any question regarding crop pests, fertilizer dosages, or schemes in Marathi, Hindi, or English.*
![AI Assistant](screenshots/ai_assistant.png)

<br/>

### 5. Farm Equipment Store & MahaDBT Subsidies
*Discover modern farm machinery, solar pumps, and government subsidy schemes.*
![Equipment Store](screenshots/equipment.png)

</div>

---

## 🌾 What Problem ShetiMitra Solves

Most farmers harvest high-value crops (such as Grapes, Pomegranates, Onions, Tomatoes, Cotton, and Soybean) without knowing their exact per-kilogram break-even production cost. When selling to middlemen:
- Farmers often sell below their cost of production due to lack of market data.
- High transportation and APMC commission fees reduce take-home income.
- Disease and pest outbreaks lead to excessive chemical spray costs and crop loss.

**ShetiMitra solves this by putting financial, agronomic, and market intelligence directly into the farmer's hands.**

---

## ✨ Key Features & Capabilities

### 1. 📊 True Cost of Production & Break-even Calculator
- Automatically tracks plot-wise expenses (labour, drip fertilizers, spraying, pruning, packing).
- Calculates the exact **₹/kg break-even price** based on expected orchard yield.
- Ensures the farmer knows their minimum selling threshold before negotiating with traders.

### 2. 📈 Live APMC Market Intelligence
- Real-time modal, minimum, and maximum rates across major agricultural markets (Pimpalgaon Baswant, Tasgaon, Solapur, Nashik, Pune).
- Daily arrival volumes, price trends, and percentage changes.

### 3. 🤝 Verified Direct Buyers & Exporter Network
- Direct connectivity with certified corporate retailers, FPCs, and exporters.
- Transparent deal terms: farm-gate pickup (saving transportation costs), digital weighbridge, and direct bank transfers.

### 4. 🤖 AI Sheti Doctor & Chatbot
- Farmers can ask **any farming question** in their local language (मराठी, हिंदी, English).
- Provides exact chemical/organic dosages per liter or acre for all major crops.
- Multimodal diagnosis: Upload leaf/fruit photos to instantly detect fungal stress, bacterial blight, or pest attacks.

### 5. 🚜 Farm Machinery & MahaDBT Subsidy Hub
- Catalog of battery sprayers, pruning shears, solar irrigation, and tillers.
- Highlights 50% to 90% government subsidies under MahaDBT, PM-KUSUM, and state horticulture schemes.

### 6. 🌐 Multilingual & Voice-Enabled
- Full localization in **मराठी (Marathi)**, **हिंदी (Hindi)**, and **English**.
- Audio voice playback for daily morning market and profit summaries.

---

## 🧭 Application Modules & Navigation

| Module | Route | What It Does |
|---|---|---|
| **Farmer Registration** | `/register` | Setup farm profile, acreage, primary crop, soil, and irrigation type. |
| **Secure Login** | `/login` | Access accounts via registered mobile and secure password or OTP. |
| **Smart Dashboard** | `/dashboard` | Central command center showing revenue, costs, and crop health. |
| **Plot Management** | `/farm` | Track multiple plots, acreage, variety, and pruning stages. |
| **Crop Activities** | `/crop-activities` | Schedule and check off sprays, fertigation, and harvesting tasks. |
| **Expense Tracker** | `/expenses` | Log input bills and labour payments categorized by crop and plot. |
| **Harvest Records** | `/harvest` | Log batch weights, sugar Brix levels (14–18°), and sale revenues. |
| **Market Rates** | `/market` | Live daily market prices, arrivals, and price-movement charts. |
| **Buyer Directory** | `/buyers` | Browse verified buyers, ratings, minimum quantities, and offers. |
| **Selling Decision** | `/selling-decision` | Compare selling options to find the highest net cash-in-hand. |
| **AI Agronomist** | `/assistant` | 24/7 intelligent agricultural consulting. |
| **Equipment Store** | `/equipment` | Buy subsidised farm machinery with free delivery. |

---

## 🚀 How to Run the Project Locally

### 1. Start Backend Server
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate   # On Windows (or source venv/bin/activate on Linux/Mac)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

### 2. Start Frontend Web App
```bash
cd frontend
npm install
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:5173
```

---

## 👥 Target Users & Impact
- **Small & Medium Landholders:** Accurate daily expense tracking without manual paperwork.
- **Commercial & Export Growers:** Precision harvesting, Brix monitoring, and global export compliance.
- **Farmer Producer Companies (FPCs):** Aggregate produce, compare wholesale rates, and negotiate directly with corporate supply chains.

---

<div align="center">
  <sub>बळीराजाच्या प्रगतीसाठी समर्पित • Dedicated to Farmer Prosperity</sub>
</div>
