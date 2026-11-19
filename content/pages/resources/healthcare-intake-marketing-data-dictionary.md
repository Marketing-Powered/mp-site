---
title: "Healthcare Marketing Data Dictionary: Pipeline Guide"
url: "/resources/healthcare-intake-marketing-data-dictionary/"
primary_keyword: "healthcare marketing data dictionary"
secondary_keywords: "lead status schema, marketing-to-intake pipeline, cost per qualified call"
author: "mike-hulick"
---

SEO METADATA
Title tag: Healthcare Marketing Data Dictionary: Pipeline Guide
Meta description: Align intake CRM stages, eliminate lead status silos, and track attribution from click to admission with a healthcare marketing data dictionary.
H1: Healthcare Marketing to Admissions Data Dictionary and KPI Definitions
Hero image alt: Healthcare marketing and admissions leaders reviewing intake performance dashboards together.


PAGE COPY

Healthcare Marketing to Admissions Data Dictionary and KPI Definitions
A healthcare marketing data dictionary establishes unified operational definitions across growth campaigns, intake contact centers, and clinical admissions teams. Without this shared taxonomy, marketing teams report low acquisition costs on raw inquiries while admissions coordinators struggle with uncontacted or unqualified contacts. Standardizing every stage from click to bed placement ensures your leadership team makes capital allocation decisions based on verified clinical admissions rather than vanity call volume.
[CTA] Request a download template or request audit → /get-started/request-an-audit
What a Healthcare Marketing Data Dictionary Is and Why It Matters
A healthcare marketing data dictionary is a centralized master reference that defines every stage, field, event, and disposition across the marketing-to-intake pipeline. It aligns digital ad platforms, call tracking software, and clinical intake customer relationship management (CRM) systems around identical terms. Instead of treating an incoming phone call as a successful conversion, the data dictionary specifies what makes a record valid, who updates its status, and how clinical, financial, or operational disqualifications are categorized.
In many healthcare facilities, a disconnect plays out daily between the marketing office and the intake call floor. A paid search specialist monitors an analytics dashboard reporting 250 conversions for the week at an average cost per lead of $85. Fifty feet away, an intake coordinator sits before a CRM queue filled with voicemails, duplicate records, wrong numbers, and inquiries seeking services the facility does not provide. The marketing team celebrates high efficiency while admissions coordinators struggle with low capacity utilization.
This operational breakdown occurs because growth teams and admissions departments use the same word to describe entirely different events:
* To an advertising platform or media buyer, a lead is a form submission, chat start, or phone call that lasts longer than 60 seconds.
* To an admissions intake coordinator, an inquiry is an unverified contact that requires manual outreach, basic demographic screening, and insurance verification.
* To a chief operating officer or chief financial officer, a qualified opportunity is a patient who meets medical necessity criteria, holds active in-network insurance or self-pay funding, and is clinically suitable for an available bed.
A healthcare marketing data dictionary resolves this conflict. It standardizes definitions across paid search, landing pages, call tracking platforms, and CRMs such as Salesforce Health Cloud, Kipu, or Sunwave. When both departments operate from a single source of truth, leadership can calculate real patient acquisition economics and eliminate spend that generates unqualified call volume.
Mapping the Complete Marketing-to-Intake Pipeline
A patient journey in specialized medical care, behavioral healthcare, or addiction treatment rarely resembles an e-commerce checkout. Inquiries involve emotional vulnerability, complex payer approvals, family interventions, and urgent clinical evaluations.
Tracking this journey requires breaking the pipeline into distinct, sequential milestones. Combining these phases into generic stages obscures where prospective patients drop off. A robust marketing-to-intake pipeline tracks seven specific operational phases:
* First Digital Impression and Click: The prospective patient or family member conducts a high-intent search, reviews landing page resources, and initiates an inquiry. Dynamic number insertion (DNI) software captures the traffic source, ad group, campaign, and session identifiers without capturing protected health information (PHI).
* Raw Inquiry: An inbound signal enters the organization via a phone call, secure web form, or chat interaction. At this milestone, the record contains only basic contact parameters and digital source metadata.
* Contacted / Pre-Screened: An intake coordinator completes a two-way conversation with the caller or contact person. The coordinator confirms basic geographic proximity, age eligibility, and primary presenting concerns to determine if the provider can address the caller's clinical needs.
* Clinically Qualified: A trained intake professional or clinician conducts a structured assessment against established criteria, such as American Society of Addiction Medicine (ASAM) level-of-care dimensions or specialty clinical admission criteria. The patient is deemed medically and clinically suitable for the facility's licensed care levels.
* Financially Qualified / VOB Completed: The revenue cycle management team completes a verification of benefits (VOB) with the payer or confirms self-pay arrangements. The verification establishes deductible status, co-insurance requirements, out-of-pocket maximums, and pre-authorization requirements.
* Admission Scheduled / Bed Reserved: The patient accepts clinical and financial terms, a specific arrival date is scheduled, travel logistics are arranged, and bed capacity is reserved at the facility.
* Arrived Admission: The patient arrives on campus, completes initial nursing and medical intake, signs formal consent documentation, and enters active census.
Treating any stage prior to clinical assessment and financial clearance as a conversion misleads growth teams. When marketing algorithms optimize toward raw inquiries, ad engines find more users likely to click or call, regardless of whether those users carry valid insurance or meet clinical admission standards.
The Lead Status Schema: Standardizing CRM Dispositions
The foundation of the healthcare marketing data dictionary is the lead status schema. Every intake representative must apply standardized status labels within the CRM. Free-form text fields or subjective drop-down menus compromise pipeline integrity.
The following schema provides the standard taxonomy required to maintain clean marketing-to-admissions data:
* New Inquiry. Pipeline Stage: Raw Inquiry. Operational Definition: Incoming call, web inquiry, or chat logged in the CRM with no contact attempt completed. System Action / Trigger: Automated intake record creation via call software or web hook.
* Attempting Contact; Pipeline Stage: Outreach; Operational Definition: Outbound call, secure SMS, or email sent; prospective patient has not yet answered.; System Action / Trigger: Timestamped call logging; initiates standard intake follow-up cadence (attempts 1 through 5).
* Engaged / In Triage; Pipeline Stage: Contacted; Operational Definition: Two-way dialogue active; pre-screening questions underway to evaluate immediate safety and program match.; System Action / Trigger: Manual status update by intake specialist during live call.
* Disqualified: Non-Clinical; Pipeline Stage: Closed / Inactive; Operational Definition: Inquiry represents a vendor, employment seeker, duplicate contact, wrong number, or solicitor.; System Action / Trigger: Tagged with non-clinical sub-reason; automatically excluded from marketing conversion tallies.
* Disqualified: Out of Scope; Pipeline Stage: Closed / Inactive; Operational Definition: Patient acuity requires services beyond facility scope (e.g., active psychosis at a non-psychiatric facility).; System Action / Trigger: Logged with clinical sub-reason; referral made to appropriate care setting.
* Disqualified: Financial. Pipeline Stage: Closed / Inactive. Operational Definition: Payer out of network, Medicaid/Medicare where not accepted, or patient unable to meet out-of-pocket costs. System Action / Trigger: Payer name and coverage type recorded for business development review.
* VOB Pending; Pipeline Stage: Financial Review; Operational Definition: Clinical intake complete; demographic and insurance details transmitted to billing department for benefit verification.; System Action / Trigger: Automated task assignment generated for revenue cycle team.
* VOB Approved. Pipeline Stage: Financial Clearance. Operational Definition: Payer confirms active policy and benefits align with minimum admission thresholds. System Action / Trigger: Notification routed back to admissions coordinator to review financial obligations.
* Assessment Scheduled. Pipeline Stage: Clinical Clearance. Operational Definition: Patient scheduled for comprehensive clinical evaluation, biopsychosocial intake, or medical clearance exam. System Action / Trigger: Calendar event booked in intake schedule.
* Admission Scheduled; Pipeline Stage: Scheduled; Operational Definition: Bed hold placed; intake date, arrival time, and transportation logistics locked.; System Action / Trigger: Facility census dashboard updated with pending arrival.
* Admitted; Pipeline Stage: Census; Operational Definition: Patient physically checked in, evaluated by medical staff, and transitioned to clinical chart.; System Action / Trigger: Final conversion milestone; triggers downstream attribution reconciliation.
Standardizing these statuses ensures that pipeline reviews identify precise bottlenecks. If drop-offs spike between "Engaged" and "VOB Pending," clinical screening protocols may be screening out addressable demand, or intake staffing may be insufficient during peak inquiry hours.
Operational Metrics and Calculating Cost Per Qualified Call
Relying on cost per lead (CPL) masks marketing waste. In behavioral health and specialized healthcare, a campaign delivering a $60 CPL can prove far more expensive overall than a campaign delivering a $220 CPL if the former yields zero admitted patients.
To establish economic clarity, healthcare leaders track acquisition efficiency through three core operational metrics:
### Cost Per Qualified Call (CPQC)
Cost per qualified call isolates your actual marketing expense to generate a conversation that satisfies basic clinical and geographic criteria. Calculate CPQC with the following formula:
CPQC = Total Media Spend ÷ Total Qualified Inbound Inquiries (Engaged + Clinically Suitable)
For example, an organization spending $50,000 per month on Google Ads that generates 400 raw phone calls may appear to achieve a $125 cost per call. If manual screening reveals that 270 of those calls were solicitors, out-of-state Medicaid inquiries for an out-of-network facility, or wrong numbers, only 130 calls were clinically viable. The true Cost Per Qualified Call is:
$50,000 ÷ 130 = $384.62
Evaluating media channels by CPQC immediately shifts budget allocation away from high-volume, low-intent terms toward specific queries that reach decision-ready individuals.
### Verification of Benefits Conversion Rate (VOB Rate)
This metric reflects the proportion of clinically pre-screened callers who submit insurance information for formal benefits verification:
VOB Rate = (Completed VOBs ÷ Clinically Qualified Calls) × 100
A declining VOB rate often signals mismatched commercial intent in paid search campaigns, such as bidding on educational or symptom-research keywords rather than facility-seeking intent.
### Cost Per Arrived Admission (Customer Acquisition Cost)
The ultimate measure of healthcare acquisition health is the total commercial cost to place a patient into care:
CAC = (Total Direct Media Spend + Intake Technology Overhead) ÷ (Arrived Admissions)
Our work across the sector demonstrates the necessity of connecting advertising investment directly to census outcomes. Marketing Powered was founded by a former healthcare CMO who ran marketing for a treatment network that grew from 3 to 24 locations, managing $1.5 to $2M per month in Google Ads across 11+ behavioral and mental health accounts. At that operational scale, managing spend against upstream CPL creates severe capital waste. Attribution must track through to the arrived admission.
For teams refining their commercial modeling, our analysis of [behavioral health acquisition frameworks](/who-we-help/behavioral-health) outlines how to structure level-of-care capacity against digital investment.
Privacy-Safe Attribution and Sensitive Category Platform Compliance
Healthcare organizations must navigate strict data privacy guardrails while measuring pipeline performance. Recent enforcement actions and formal guidance from the [HHS Office for Civil Rights on online tracking technologies](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-guidance-tracking-technologies/index.html) make clear that deploying standard third-party tracking pixels on patient portals, authenticated intake forms, or condition-specific pages can disclose protected health information (PHI) to unauthorized vendors without valid HIPAA authorizations.
Simultaneously, major search engines restrict how healthcare services are promoted. The [Google Ads Personalized Advertising Policy](https://support.google.com/adspolicy/answer/143465) explicitly prohibits retargeting users based on sensitive health categories, including mental health conditions, substance use disorders, and medical procedures. Providers cannot build remarketing audiences of people who visited specific treatment pages or dropped off during an intake assessment. Furthermore, addiction treatment providers must satisfy rigorous third-party verification, including [LegitScript addiction treatment certification requirements](https://www.legitscript.com/certification/addiction-treatment-certification/), before running search campaigns.
Maintaining accurate pipeline attribution within these regulatory parameters requires a privacy-first data pipeline:
* Server-Side Integration: Web servers ingest conversion signals and strip out personal identifiers, IP addresses, and specific medical query details before transmitting non-sensitive telemetry back to advertising engines.
* Aggregated Conversion Modeling: Rather than streaming granular user events back to ad platforms, providers pass back anonymous, hashed offline transaction identifiers tied to closed CRM dispositions.
* Owned, Local Processing Infrastructure: Organizations handling sensitive inquiry analysis benefit from owned, local AI infrastructure for HIPAA-aware inference, preventing prospective patient transcripts or intake notes from entering multi-tenant public AI platforms.
Admissions attribution does not require sharing diagnostic codes or individual patient identities with media platforms. It requires passing mathematical conversion values tied to anonymous click identifiers (GCLID/WBRAID) so algorithmic bidding systems optimize toward patients who legitimately convert into facility census. Discover how to architect this infrastructure in our guide to [analytics and attribution services](/services/analytics-and-attribution).
Implementation Ownership: Aligning Marketing Directors with Admissions Teams
Implementing a healthcare marketing data dictionary is an operational change that requires cross-departmental governance. Without clear operational ownership, data hygiene degrades within weeks.
A sustainable implementation establishes clear boundaries and collaborative routines between growth teams and intake personnel:
Governance responsibilities must be explicitly assigned across four key operational roles:
* The Paid Media Manager: Owns campaign taxonomy, UTM hygiene, and dynamic call tracking numbers. This role ensures every inbound source delivers clean tracking parameters into the CRM payload without injecting patient identifiers into public ad tags.
* The Intake Call Center Supervisor: Owns daily disposition compliance. The supervisor audits call recordings against CRM statuses, verifying that representatives log disqualification reasons accurately rather than letting records languish in "Attempting Contact."
* The Revenue Cycle / VOB Specialist: Owns financial status timestamps. When benefits are verified, this specialist updates the status field within 60 minutes, recording verified coverage type and network status.
* The Chief Marketing Officer / Admissions Director: Co-lead a weekly pipeline reconciliation audit. They review the ratio of raw inquiries to qualified calls, evaluate clinical disqualification trends, and adjust media targeting based on current bed availability by service line.
Establishing this accountability loop prevents operational silos. When admissions coordinators recognize that logging precise disqualification reasons directly trains the marketing algorithms to stop sending unqualified calls, data accuracy improves rapidly across the organization.

FAQ
Q: What should a provider expect from a healthcare marketing data dictionary?
A: A provider should expect clear operational definitions for every stage of the patient acquisition journey, eliminating internal disagreement between marketing metrics and admissions reality. Operationally, leadership gains visibility into true acquisition costs, including cost per qualified call and cost per admission. Digital campaigns begin optimizing toward patients who meet clinical and financial admission criteria, reducing wasted ad spend on unqualified inquiries.
Q: How should a healthcare marketing data dictionary be measured against qualified calls or admissions?
A: A healthcare marketing data dictionary is evaluated by the consistency of CRM disposition tagging and the correlation between recorded conversions and confirmed admissions. Measure the percentage of unassigned or vaguely categorized records in the CRM, aiming for less than 3 percent uncategorized records. Track the ratio of Cost Per Qualified Call to overall patient acquisition cost over time. As data dictionary definitions take hold, the conversion rate from verified insurance benefits to physical admissions should increase, signaling higher intent from media traffic.
Q: Why is dynamic call tracking necessary for healthcare pipeline attribution?
A: Most high-intent healthcare decisions occur over the phone. Without dynamic number insertion (DNI) linked directly to the intake CRM, phone inquiries arrive as unassigned direct traffic. DNI assigns a pool of trackable numbers to website sessions, mapping digital campaigns, search keywords, and ad creatives to the resulting phone call record while preserving patient privacy.
Q: Can an intake CRM pass data back to Google Ads without violating HIPAA?
A: Yes, provided that the integration uses server-side offline conversion tracking and excludes protected health information. Platforms utilize an anonymous transaction identifier or click ID (such as Google GCLID) associated with an offline event value (e.g., "VOB Completed" or "Admission"). The ad platform never receives the patient's name, phone number, diagnosis, or clinical notes.
Q: How often should leadership review pipeline data definitions?
A: Review data dictionary definitions and intake status mappings quarterly. Operational criteria shift when facilities add new service lines, establish fresh in-network payer contracts, or open new physical locations. Regular reviews ensure the lead status schema continues to reflect clinical capabilities and operational intake capacity. Additional pipeline resources are available in our [operational marketing library](/resources). [Download the data dictionary template or request an acquisition audit](/services/analytics-and-attribution)
