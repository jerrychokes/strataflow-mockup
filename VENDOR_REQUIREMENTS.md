# Strataflow Mockup — Environmental Data Management Capability Gap Requirements

**Document type:** Vendor requirements brief  
**Purpose:** High-fidelity mockup expansion  
**Perspective:** Independent environmental-science and EDMS acquisition advisor  
**Benchmark context:** Experienced practitioner expectations informed by ESDAT, EQuIS and comparable environmental data platforms

## 1. Purpose and scope

The current Strataflow mockup demonstrates a strong groundwater-focused environmental data-management concept, particularly in QA/QC, provenance, evidence lineage, interpretation and compliance.

This brief defines the product-design and workflow gaps that the vendor must address through the high-fidelity mockup. It is deliberately restricted to matters a mockup can credibly resolve: screens, workflows, information architecture, user decisions, system states, exceptions, visible data relationships and interaction patterns.

The revised mockup must demonstrate how an experienced environmental scientist works across the following lifecycle:

> **Monitoring design → field and laboratory data → validation → interrogation → spatial and scientific analysis → interpretation → regulatory assessment → reporting and action**

The existing strengths of Strataflow—especially defensibility, professional judgement and end-to-end evidence lineage—must be preserved and extended through every new capability.

## 2. Vendor acceptance standard

> **A requirement is not satisfied merely by adding a navigation item, dashboard card, table, modal or standalone screen. The mockup must demonstrate the environmental scientist's workflow, the information required to make the relevant scientific or regulatory decision, the available actions, relevant system states, exception conditions, and the relationship of the information to upstream evidence and downstream use. Where a workflow involves professional judgement, the design must show how that judgement is recorded and defended.**

The vendor is not being asked to reproduce EQuIS or ESDAT. Incumbent capabilities are referenced only to establish the minimum functional problems that experienced environmental practitioners expect an EDMS to solve. New functionality must remain consistent with Strataflow's evidence-centred product model and must not be added where it creates complexity without materially improving environmental data acquisition, quality, analysis, interpretation, compliance or defensibility.

## 3. Priorities

| Rank | Capability gap | Priority | Mockup objective |
|---:|---|---|---|
| 1 | Environmental Data Explorer and Query Builder | P0 | Demonstrate arbitrary, defensible scientific interrogation |
| 2 | GIS and spatial environmental workspace | P0 | Make mapping a scientific investigation workspace |
| 3 | Sampling and Analysis Planning | P0 | Connect intended monitoring with execution and completeness |
| 4 | Laboratory/EDD configuration and onboarding | P1 | Demonstrate transparent, reusable format mapping and exception resolution |
| 5 | QA/QC rule catalogue and validation | P1 | Demonstrate breadth without weakening the existing decision model |
| 6 | Hydrogeological and environmental analysis | P1 | Add the analytical tools and lineage expected by practitioners |
| 7 | Portfolio environmental operations | P1 | Support senior users working across many sites and projects |
| 8 | Configuration governance | P1 | Show scope, inheritance, approval, versioning and historical applicability |
| 9 | Interpretation and reporting | P1/P2 | Extend evidence-linked authoring, review and publication workflows |
| 10 | Regulatory criteria management | P2 | Treat criteria as governed, versioned environmental information |
| 11 | Multi-domain environmental monitoring | Strategic | Demonstrate expansion beyond groundwater through a common model |

## 4. P0 — Environmental Data Explorer and Query Builder

### 4.1 Gap

The existing results and crosstab functions do not yet demonstrate the arbitrary interrogation expected of a mature environmental data-management platform. Environmental scientists routinely need to construct datasets that were not anticipated when a project was configured.

The mockup must provide a dedicated **Data Explorer**, rather than relying exclusively on predetermined dashboards and reports.

### 4.2 Query dimensions

The vendor shall show users constructing queries through combinations of the following dimensions.

#### Project and organisational context

- Organisation or client
- Project
- Site
- Monitoring programme
- Sampling event or monitoring round

#### Location and environmental setting

- Monitoring location
- Location type
- Bore
- Bore group
- Area or spatial grouping
- Hydrostratigraphic unit
- Screened interval
- Sample or investigation depth range

#### Sample

- Sample date and time
- Sample type
- Matrix
- Depth
- Field or laboratory sample
- Primary, duplicate, blank or other QA sample type

#### Analytical

- Analyte
- Analyte group or suite
- Method
- Laboratory
- Laboratory batch
- Unit
- Fraction, including dissolved or total
- Detection or reporting limit

#### Data quality

- Validation status
- Qualifier
- QA/QC disposition
- Included or rejected result
- Detection status
- Current or superseded result

#### Criteria

- Applicable guideline or criterion
- Criterion category
- Exceedance or non-exceedance
- Magnitude above criterion

#### Time

- Arbitrary date range
- Monitoring round
- Season
- Month, quarter or year
- Latest result
- Historical period

### 4.3 Query interaction

The mockup must demonstrate progressive query construction and show how the resulting population changes as filters are applied. The user should see the remaining number of locations, samples and results.

The required complex scenario is:

> **Groundwater → Unit C → dissolved metals → arsenic and manganese → 2021–2026 → validated results only → rejected data excluded → comparison against nominated groundwater criteria**

The design must show enough detail for a scientist to understand exactly why each record is included or excluded.

### 4.4 Result representations

Without rebuilding the query, users must be able to move between:

- Tabular results
- Crosstab
- Time series
- Summary statistics
- Map
- Exceedance view

The active population and filters must remain visible or readily inspectable in every representation.

### 4.5 Saved queries and governed datasets

Users must be shown being able to:

- Save and name a query
- Describe its purpose
- Reopen and modify it
- Save a variant without overwriting the original
- Identify its creator and current owner
- Inspect the filtering logic
- Understand whether the query is draft, shared, approved or superseded

A saved query or dataset used by an analysis, figure, interpretation or report must retain lineage to the exact query definition and relevant version.

## 5. P0 — GIS and Spatial Environmental Workspace

### 5.1 Gap

Mapping must become a **scientific investigation workspace**, not simply another way of displaying monitoring locations.

### 5.2 Required environmental layers

The mockup shall demonstrate:

- Monitoring locations
- Groundwater bores
- Surface-water monitoring points
- Soil, sediment and other sampling locations
- Site and project boundaries
- Operational and infrastructure areas
- Hydrostratigraphic units
- Geology
- Groundwater contours
- Contaminant or plume contours
- Receptors
- Drainage and surface-water features
- Regulatory or compliance areas
- Aerial imagery or background mapping

The interface must clearly identify active layers, legends, source, date or version where relevant, and whether a layer is project-supplied, derived or authoritative.

### 5.3 Environmental symbology

Users must be able to colour or symbolise locations by:

- Analyte concentration
- Criterion exceedance
- QA/QC status
- Monitoring status
- Groundwater elevation
- Trend
- Location type

The design must show how the selected analyte, criterion, time period, units, treatment of non-detects and classification method affect the map.

### 5.4 Temporal analysis

The workspace must support investigation through time using a time or monitoring-round control. It must demonstrate, for example:

> **PFAS concentration — March 2024 → September 2024 → March 2025 → September 2025**

The user must not need to rebuild the map for each period. The design should show how missing rounds, unsampled locations and changed monitoring networks are represented.

### 5.5 Location investigation

Selecting a bore or location must expose relevant scientific context without unnecessarily leaving the spatial investigation:

- Construction details
- Screened interval or sample depth context
- Groundwater elevation
- Recent samples and field observations
- Exceedances
- Hydrograph or relevant time series
- Analytes and results
- QA/QC state
- Photographs or attachments where appropriate

### 5.6 Spatial selection and hand-off

The mockup must show geographical selection being passed into the Data Explorer or an analysis. For example:

> **Select all bores downgradient of Area A → analyse nitrate and PFAS**

The relationship between **Map ↔ Data Explorer ↔ Analysis** is mandatory. Context, filters and selected populations must persist between workspaces.

## 6. P0 — Sampling and Analysis Planning

### 6.1 Gap

Strataflow must demonstrate not only the recording of samples, but the management of the intended monitoring programme and confirmation that it was executed correctly.

### 6.2 Monitoring programme definition

A scientist must be shown defining:

- Monitoring locations
- Sampling frequency
- Matrices
- Field parameters
- Analytes and analytical suites
- Laboratory methods
- QA/QC frequency and requirements
- Programme start and end dates
- Responsible party
- Applicable obligations or commitments

The mockup must show recurring requirements, one-off exceptions, temporary location changes and versioned programme amendments.

### 6.3 Sampling event preparation

For an upcoming monitoring round, the mockup must show expected work generated from the programme. For every location, the scientist must understand what is to be collected, including:

- Required samples
- Analytes or suites
- Field measurements
- Duplicates
- Blanks and other QA samples
- Bottles or containers where applicable
- Preservation requirements where applicable
- Assigned laboratory
- Holding-time considerations where applicable
- Field instructions or location-specific hazards

The design should distinguish programme requirements, event-specific amendments and field decisions.

### 6.4 Planned-versus-actual completeness workflow

After fieldwork and laboratory receipt, Strataflow must visibly reconcile:

> **Planned → collected → submitted → received → analysed → validated**

The scientist must be able to identify and act on:

- Missing samples
- Unsampled locations
- Missing analytes
- Incomplete suites
- Missing QA samples
- Unexpected samples or analytes
- Cancelled or deferred monitoring
- Results not yet received
- Results received after holding time
- Samples that cannot be matched to the plan

This must be an actionable monitoring-completeness workflow, not merely a status table. The mockup must show owners, rationale, disposition, due dates and downstream consequences where relevant.

## 7. P1 — Laboratory/EDD Configuration and Onboarding

### 7.1 Gap

The existing laboratory model is scientifically promising, but the mockup must demonstrate how organisations manage different laboratories, historical consultant files and changing EDD formats.

### 7.2 Required onboarding workflow

Show the following complete workflow:

> **New laboratory or format → define/import structure → map fields → validate → preview → resolve issues → test → review → save reusable format**

### 7.3 Environmental field mapping

The mapping interface must demonstrate, at minimum:

- Laboratory sample ID
- Client sample ID
- Location
- Sample date and time
- Matrix
- Analyte
- CAS or reference identifier where applicable
- Analytical method
- Result
- Unit
- Reporting limit
- Detection status
- Laboratory qualifier
- Batch
- QC relationship

The user must be able to see the source field, mapped Strataflow field, transformation or reference-data mapping, validation state and example value.

### 7.4 Problem and exception handling

The mockup must deliberately include problematic input such as:

- Unknown analyte
- Unexpected or incompatible unit
- Unmatched location
- Unknown method
- Invalid date
- Duplicate record
- Missing mandatory field
- Unresolved laboratory/client sample relationship
- Ambiguous QA/QC relationship

The scientist or data manager must be shown resolving these explicitly. The system must not imply that scientifically material transformations occur silently.

### 7.5 Mapping-profile governance

Mappings must be:

- Named and described
- Associated with a laboratory and format
- Versioned
- Reusable
- Testable and reviewable
- Approved before operational use where appropriate
- Supersedable without rewriting historical imports

The mockup must show which mapping version was used for a particular import and which transformations affected a selected result.

## 8. P1 — QA/QC Rule Catalogue and Scientific Validation

### 8.1 Gap and design constraint

The current QA/QC architecture is one of Strataflow's strongest areas. The vendor must **not redesign its fundamental model**. The revised mockup must demonstrate that the model can accommodate the breadth of environmental validation encountered in practice.

### 8.2 Rule catalogue coverage

The catalogue must visibly accommodate:

- Holding times
- Method blanks
- Trip blanks
- Field blanks
- Equipment blanks
- Laboratory duplicates
- Field duplicates
- Relative percent difference
- Laboratory control sample recovery
- Matrix spike recovery
- Matrix spike duplicates
- Surrogate recovery
- Reporting limits
- Detection limits
- Dilution
- Preservation
- Field-parameter stability
- Ionic balance
- Monitoring and analytical completeness
- Required analytical methods
- Required QA frequency
- Cross-record consistency

Not every calculation requires a separate screen. The design objective is a coherent catalogue and configuration model capable of representing this breadth.

### 8.3 Rule context

A rule must visibly identify:

- What it evaluates
- Applicable matrix
- Applicable analyte or analyte group
- Applicable method, where relevant
- Acceptance range or logic
- Severity
- Resulting finding
- Whether automatic disposition is permitted
- Whether professional judgement is required
- Configuration scope and version

### 8.4 Professional judgement workflow

The mockup must preserve and extend the workflow:

> **Automated finding → evidence → scientist review → disposition → qualifier → rationale → downstream consequence**

The design must show conflicting evidence, linked batch and QA results, prior related decisions, comments or review, and how a decision affects included data, analyses, figures, interpretations and reports.

## 9. P1 — Hydrogeological and Environmental Analysis

### 9.1 Gap

Hydrographs alone do not represent the analytical toolkit expected by groundwater professionals. The mockup must demonstrate a coherent **Analysis workspace**.

### 9.2 Groundwater-level analysis

Include workflows for:

- Groundwater elevation
- Depth to groundwater
- Hydrographs
- Multiple-bore comparison
- Rainfall overlay
- Pumping or abstraction overlay
- Monitoring-round comparison
- Hydraulic-gradient assessment

The design must expose datum, units, bore reference elevation, measurement status, temporal alignment and relevant exclusions.

### 9.3 Hydrochemistry

Provide representations and associated workflows for:

- Piper diagram
- Schoeller diagram
- Stiff diagram
- Durov diagram
- Ionic balance
- Major-ion composition
- Water type or facies

The user must be able to inspect the input population, excluded records, unit conversions, charge-balance result and grouping or symbolisation logic.

### 9.4 Trend and statistical analysis

The design shall accommodate:

- Summary statistics
- Percentiles
- Minimum and maximum
- Detection frequency
- Exceedance frequency
- Mann-Kendall trend
- Sen's slope
- Seasonal comparison
- Censored or non-detect data treatment
- Background or reference-population comparison

The interface must expose the analytical population, time range, treatment of non-detects, grouping, assumptions and method. A graph without an inspectable underlying population is inconsistent with Strataflow's defensibility proposition.

### 9.5 Analysis lineage

Every analysis must be traceable through:

> **Query → included observations/results → QA/QC state → analytical settings → output**

Where an output supports a figure, interpretation, decision, obligation or report, that downstream relationship must also be visible.

## 10. P1 — Portfolio Environmental Operations

### 10.1 Gap

The mockup must demonstrate how a senior environmental manager works across many projects and sites, rather than one dataset at a time.

### 10.2 Portfolio context

The workspace shall provide visibility across:

- Organisations or clients
- Projects
- Sites
- Environmental domains
- Monitoring programmes
- Monitoring rounds

The hierarchy and current filter context must be apparent. Users must be able to move from portfolio condition to the relevant project evidence without losing context.

### 10.3 Environmental work queue

The user must be able to identify:

- QA/QC findings awaiting review
- Overdue monitoring
- Incomplete rounds
- Unresolved exceedances
- Laboratory data awaiting action
- Mapping or import exceptions
- Interpretations awaiting review
- Reporting actions
- Compliance or notification actions

The work queue must support filtering by:

- Organisation/client
- Project
- Site
- Programme
- Environmental domain
- Issue type
- Severity
- Owner
- Status
- Due date

It must also demonstrate assignment, reassignment, bulk triage where scientifically appropriate, escalation, dependency and evidence-linked resolution.

The objective is not another executive dashboard. The workspace must answer:

> **What environmental work requires attention today, why, and what happens if it is not resolved?**

## 11. P1 — Configuration Governance

### 11.1 Gap

Environmental configuration must have explicit scope, inheritance and lifecycle.

### 11.2 Configuration hierarchy

The mockup must show whether configuration originates at:

> **Organisation → client → project → monitoring programme**

It must show whether lower levels inherit or override the configuration. This applies particularly to:

- Criteria
- Analytes and dictionaries
- Units and conversions
- QA/QC rules and DQOs
- EDD formats
- Mapping profiles
- Sampling requirements

The user must be able to distinguish an inherited value, an overridden value and a locally created value, and understand the consequence of a proposed change.

### 11.3 Configuration lifecycle

Important configuration must visibly support:

> **Draft → Review → Approved → Effective → Superseded**

Users must understand:

- Who changed it
- What changed
- When it changed
- Why it changed
- Where it applies
- Who reviewed and approved it
- Its effective period
- The version applicable historically
- Which programmes, assessments or outputs may be affected

The workflow must show rejected changes, returned-for-revision states, future-effective configurations and comparison between versions.

## 12. P1/P2 — Interpretation and Reporting

### 12.1 Gap and design intent

The existing Interpretation Editor is strategically strong and must be expanded rather than replaced with generic word-processing functionality.

### 12.2 Interpretation object

An interpretation must be capable of referencing:

- Results
- Saved queries or governed datasets
- Statistics and analyses
- Hydrographs
- Maps
- Figures
- QA/QC findings and decisions
- Exceedances
- Monitoring rounds
- Regulatory criteria and obligations

The interface must distinguish evidence, the scientist's interpretation, uncertainty, limitations and recommended action.

### 12.3 Managed figures and tables

The mockup shall demonstrate managed:

- Figures
- Tables
- Captions
- Numbering
- Cross-references
- Source data
- Analytical settings
- Revision state
- Reuse across report sections

The user must be able to inspect how a figure or table was generated and identify whether it is current, stale or affected by changed evidence.

### 12.4 Review and publication workflow

Show:

> **Draft → technical review → revisions → approval → published**

Reviewers must be able to comment on specific interpretations, evidence links, figures and findings. The design must show responses to comments, revision history, approval responsibility and unresolved review matters.

Where underlying evidence changes, users must be able to identify potentially affected interpretations, figures, tables and report sections. This must extend the existing lineage proposition rather than imitate Microsoft Word.

## 13. P2 — Regulatory Criteria Management

### 13.1 Gap

Criteria must be treated as governed environmental information, not simply threshold numbers.

### 13.2 Criterion information model

A criterion must contain:

- Jurisdiction
- Issuing authority
- Source document
- Guideline or standard
- Environmental medium
- Beneficial use or receptor
- Analyte or parameter
- Value
- Unit
- Criterion type
- Applicability conditions
- Effective date
- Superseded date and version where applicable

The design must show how qualifiers, hardness or pH dependencies, averaging periods, depth, land use, species protection level or other applicability conditions are represented where relevant.

### 13.3 Project application

A project must clearly answer:

> **Which criteria apply here, to which data, and why?**

The scientist must be able to distinguish:

- Regulatory criteria
- Licence conditions
- Guideline values
- Project trigger levels
- Background or reference values
- Internally defined action levels

The mockup must show selection, review, approval, effective period, scope and conflicts between potentially applicable criteria.

### 13.4 Historical defensibility

Changing a criterion must not silently rewrite historical assessments. The interface must demonstrate how a user answers both:

> **This result was assessed against criterion version X at the time.**

and:

> **Under the current criterion, how would it be assessed?**

The original and current assessments must remain distinguishable and traceable.

## 14. Strategic requirement — Multi-Domain Environmental Monitoring

### 14.1 Objective

Strataflow currently reads predominantly as a groundwater environmental-data platform. The mockup must demonstrate that its product concept can evolve into a broader environmental monitoring and evidence-management platform without creating a disconnected application for every discipline.

### 14.2 Domains to demonstrate

At minimum, the information architecture must visibly accommodate:

#### Groundwater

- Bores
- Groundwater levels
- Field parameters
- Analytical chemistry
- Bore construction
- Screened intervals
- Hydrostratigraphy

#### Surface water

- Rivers, drains, wetlands and discharge points
- Flow and level
- Field parameters
- Analytical chemistry
- Hydrological or discharge context

#### Soil

- Sampling locations
- Depth intervals
- Soil samples
- Analytical chemistry
- Contamination criteria

#### Sediment

- Locations
- Depths
- Analytical results
- Sediment criteria

#### Air and dust

- Monitoring stations
- Particulate measurements
- Deposition gauges
- Averaging periods
- Meteorological relationships
- Applicable criteria

#### Noise

- Monitoring locations
- Measurement periods
- Relevant acoustic metrics
- Operating and meteorological context
- Applicable limits

#### Meteorology

- Rainfall
- Wind speed and direction
- Temperature
- Other observations supporting environmental interpretation
- Continuous time-series context

The information architecture must leave a clear extension path for ecology, rehabilitation and waste without requiring fully designed specialist modules in this phase.

### 14.3 Common environmental model

The mockup must communicate that these domains are governed variations of a common conceptual model:

> **Programme → location → observation/sample → measurement/result → QA/QC → criterion → finding → interpretation → obligation/action → report**

### 14.4 Domain-specific scientific context

Common governance must not force every domain into identical screens. The design must demonstrate appropriate specialist context, for example:

- Groundwater has bore construction and screened intervals
- Soil has sample depths and horizons
- Surface water has flow and hydrological conditions
- Dust has averaging periods and deposition intervals
- Noise has measurement periods, acoustic metrics and operating context
- Meteorology has continuous time-series observations

The required design principle is **common governance with domain-specific scientific behaviour**.

## 15. Cross-cutting requirement — Preserve Evidence Lineage

This is a non-negotiable requirement for every new screen and workflow.

Each capability must answer, where relevant:

- Where did this information come from?
- What transformation or scientific decision produced it?
- Which version, rule or criterion applied?
- Who made or approved the decision?
- What rationale and evidence supported it?
- Which downstream outputs depend on it?

The following chain must not become a collection of disconnected modules:

> **Sampling Plan → Field Sample → Laboratory Result → QA/QC → Validated Result → Query → Analysis → Figure → Interpretation → Obligation → Report**

Users must be able to traverse scientifically meaningful relationships in both directions. Each new screen must provide entry to relevant upstream evidence and downstream use without reducing lineage to a generic audit log.

## 16. Required End-to-End Mockup Scenarios

The vendor must prove the design through connected scenarios, not only through isolated screens.

### Scenario A — Routine groundwater monitoring

Demonstrate:

> **Programme → planned round → field collection → laboratory receipt → QA/QC → validated dataset → hydrograph → exceedance → interpretation → report**

The scenario must include programme expectations, completeness reconciliation, relevant decisions and evidence lineage.

### Scenario B — Problematic laboratory batch

Demonstrate:

> **EDD received → validation problem → mapping issue → QA/QC failures → scientist review → qualification → affected results → affected figures and interpretation**

The scenario must include more than one exception type and show how the user's decisions affect downstream data use.

### Scenario C — Historical investigation

The scientist asks:

> **Why was arsenic at BH-17 reported as 0.043 mg/L in the 2024 annual report?**

The interface must lead backwards through:

> **Report → interpretation → figure/table → analytical population → validated result → QA/QC → laboratory result → sample → monitoring event → location**

The scenario must expose the relevant versions, decisions, transformations and actors.

### Scenario D — Emerging groundwater issue

Demonstrate:

> **Portfolio alert → exceedance → location → map → surrounding bores → Data Explorer → historical trend → hydrogeological analysis → interpretation → regulatory obligation/action**

The scientist must maintain project, time, spatial and analyte context as they move between workspaces.

### Scenario E — Multi-domain investigation

Demonstrate an investigation linking, for example:

> **Elevated groundwater concentration + nearby surface-water monitoring + rainfall event**

The scientist must move between the relevant domains while retaining project, temporal and spatial context. This scenario must prove that the common multi-domain model works without suppressing domain-specific scientific information.

## 17. Required Screen States and Exceptions

For each required workflow, the vendor shall provide enough linked mockup states to demonstrate:

- Initial or empty state
- Populated working state
- Filtered or selected state
- Loading or processing state where user understanding depends on it
- Warning and validation state
- Scientific or data exception state
- Review state
- Approval or completion state
- Superseded or historically applicable state where relevant
- Upstream evidence and downstream dependency views

The vendor must identify which existing screens are modified, which new screens are required and how users enter, leave and resume each workflow. Large workflows must include a screen-flow map or equivalent navigational specification.

## 18. Explicitly Out of Scope for This Mockup Brief

This phase does **not** require mockup evidence of:

- Production performance or response times
- Database scalability
- Concurrent-user capacity
- Infrastructure architecture
- API or webhook implementation
- Actual laboratory connectivity
- Actual IoT, telemetry or SCADA connectivity
- SFTP infrastructure
- Offline synchronisation engineering
- Conflict-resolution algorithms
- Cybersecurity architecture
- Disaster recovery
- Penetration testing
- Production SSO implementation
- Deployment architecture
- DOCX or PDF rendering fidelity
- Actual regulator data feeds
- Actual GIS-server integration
- Data-migration performance

These matters belong in technical implementation requirements and acquisition due diligence. The mockup may show the user-facing configuration or workflow associated with an integration where that interaction is relevant, but it must not make untestable implementation or performance claims.

## 19. Vendor Deliverables

The vendor shall provide:

1. A revised high-fidelity mockup covering all requirements in this brief.
2. A traceability matrix mapping every requirement section to screens, states and end-to-end scenarios.
3. A screen inventory identifying new, modified, retained and retired screens.
4. Linked end-to-end prototypes for Scenarios A–E.
5. Desktop and relevant responsive states for each operational workflow.
6. Defined empty, populated, exception, review, approval and superseded states.
7. Visible user roles, permissions implications and hand-offs wherever these affect the workflow, without attempting to specify security architecture.
8. A decision log identifying any assumption, unresolved environmental-science question or proposed departure from the existing Strataflow interaction model.
9. A list of requirements considered satisfied by existing screens, with direct references and rationale.
10. A list of intentionally deferred items, including the reason and the expected effect on the demonstrated workflow.

## 20. Completion and Review Criteria

The mockup shall be considered complete only when:

- Every in-scope requirement is mapped to an inspectable screen and state.
- Scenarios A–E can be followed without relying on verbal explanation from the vendor.
- Complex scientific queries and exceptions are demonstrated with realistic environmental data.
- The mockup shows what the user knows, decides and records at each important step.
- Professional judgement is attributable and supported by evidence and rationale.
- Historical versions remain distinguishable from current configurations and assessments.
- Context persists appropriately between Data Explorer, Map, Analysis, QA/QC, Interpretation, Obligations and Reporting.
- Upstream evidence and downstream dependencies are visible wherever relevant.
- Multi-domain capability is demonstrated through a common model with domain-specific scientific behaviour.
- No requirement is claimed as complete solely because a menu item, dashboard tile or isolated screen has been added.

## 21. Advisory conclusion

The purpose of this brief is not to inflate the mockup with incumbent feature lists. Strataflow's most valuable product idea is its ability to connect environmental observations to defensible decisions and published conclusions.

The revised design should make the following chain coherent, inspectable and usable across environmental domains:

> **Field evidence → governed data → scientific QA/QC → professional judgement → analysis → interpretation → regulatory obligation → action → published evidence**

If the vendor can demonstrate the requirements in this document while preserving that chain, the mockup will provide materially stronger evidence that Strataflow can evolve from a strong groundwater concept into a differentiated environmental evidence-management platform.
