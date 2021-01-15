# Completing the Data Access Request Application

## Contents
* [Overview and general instructions](#overview-and-general-instructions)
* [Filling in the application](#filling-in-the-application)
	* [Part 1: General aspects Data Request](#part-1-general-aspects-data-request)
	* [Part Extra: multi-center (consortium) request](#part-extra-multi-center-consortium-request)
	* [Part 2: Project proposal](#part-2-project-proposal)
	* [Part 3: Requested data](#part-3-requested-data)
	* [Part 4: Research context](#part-4-research-context)
	* [Part 5: Other remarks](#part-5-other-remarks)
	* [Part 6: Guarrantees](#part-6-guarrantees)
	* [Part 7: Signing](#part-7-signing)
* [Running into problems](#running-into-problems)
* [More information about the procedure](#more-information-about-the-procedure)

## Overview and general instructions

This guide is meant to help you fill in the Data Access Request application form via our BizzMine system. If you haven't got an account and would like to get one to start your Hartwig Medical Foundation Data Access Request application, please see [our website](https://www.hartwigmedicalfoundation.nl/applying-for-data/) for the procedure to get started.

When you have set up an account for our BizzMine system, you can login to: https://hartwigmedicalfoundation.bizzmine.cloud. This brings you to the Data Access Request page. To start your Data Access Request, click the '+' button in the right corner of the screen. A new Data Access Request form will then be loaded and you can start filling out your application using the guidance below. 

If you need to save your application to continue at a later time, you can find the 'Save' button by clicking the small arrow ('unfold') button next to the green button marked 'SAVE & CLOSE STEP' or 'EXECUTE' in the right upper corner. As a result, you will receive an email that you have saved your application with a link to continue. By pressing the green button marked 'SAVE & CLOSE STEP' or 'EXECUTE', you will submit your applicatoin (this is only possible when all mandatory fields are completed!).
Your Data Access Request will start the review process. We do need your input during this proces, and this will be comunicated through emails from BizzMine: please keep an eye on your mailbox! 

Please see our [Privacy Policy](https://www.hartwigmedicalfoundation.nl/en/privacy-policy/) for details on how and for what purposes (personal) data is processed by Hartwig Medical Foundation.


## Filling in the application

### Part 1: General aspects Data Request

#### 1.2 Main applicant + requesting organisation details
Please fill in the details of the main applicant (we see that this is usually the PI), this is the person that will be filling out the form. This person also needs to show that he/she is able to perform the proposed research project by showing some credentials in the form of a cv. In this section, please also fill in the details about the organisation that is requesting the data (the License Agreement will be signed on behalf of the organisation, not the main applicant).

Besides the main applicant, we also need details of a person within the same 'Legal entity' (the organisation) that is authorized to sign on its behalf. 

#### 1.3 Name + function + email address of researchers involved in the Project
Here you will need to list any persons that will be working with the data within the requirements of the License Agreement. Also check the boxes of the people that will have access to the 'raw' Hartwig Medical Foundation data. These people will be registered as 'Download contacts' and are the only ones that are able to access the data within Google Cloud Platform (GCP). The Download Contacts need to create a GCP account on their institutional email address to get access to the data when the Data Access Request is approved.

#### 1.4 Commercial party involvement
Please indicate if a commercial party is involved in the research project and provide some additional information about the involvement.

### Part Extra: multi-center (consortium) request
Please fill in this section if you'd like to collaborate with another 'Legal Entity' (institution/organisation) on the Hartwig Medical Foundation data. The License Agreement that will be drafted when your Data Access Request is approved, will enable both your institutes to work on the Hartwig Medical Foundation data.

If you only wish to collaborate on the results of your analysis on the Hartwig Medical Foundation data, you can skip this section and specify the collaboration in section 4.1. 

It is not possible to request data as a consortium, as this is no official 'Legal Entity'.

### Part 2: Project proposal

#### 2.1 Title of the Project
Please formulate a title and brief summary of your project. This title will be published on the Hartwig Medical Foundation website if your Data Access Request is approved.

#### 2.2 Brief summary of the Project for lay audience
The summary that you provide here will be published on the Hartwig Medical Foundation website if your Data Access Request is approved. This means that it should be understandable by a lay audience, and we would ask you to please avoid using technical terms. The summary should describe the research you are proposing to do with the Hartwig data.

#### 2.3 Discovery and/or validation?
Specify if your project is aimed at discovery, validation or both and provide motivation. 

#### 2.4 Detailed description of the project
This section is one of the most important fields of the request. Please describe in detail your intended project and make sure to answer all three of the following questions in this section:
1. Details on previous work on which the project is based
2. Proposed research approach, including tools and additional data that will be used
3. Anticipated results

#### 2.5 Clinical and/or patient relevance of the project
Please describe (for lay audience) what the relevance of your project is to the clinic/patient.

### 2.6 Describe the importance of the requested data for the intended project and motivate feasibility considering the data
This section needs to be used to describe why you specifically need the Hartwig Medical Foundation data to reach your research goals. Please also motivate the feasibility of the project (are you able to process the amount of data that you requested, do you have the technical expertise/personnel/computational power required?).

### Part 3: Requested data
Due to the fact that the Hartwig Medical Foundation data is sensitive in nature, we need to make sure to respect the wishes of the patients as stated in their informed consent. This means that we can only give out data that is absolutely nessessary for the research projects that are approved by our Data Access Request procedure (Scientific Board and Data Access Board). Please keep this in mind while filling in the below sections and try to narrow your request to only the patient/treatment/data that you need to get to your results.

We make a distinction in our database for 'patients' and 'samples'. Multiple samples can be taken from one patient. Some data is linked to a patient, other data is specific to a sample (sequenced biopsy).

#### 3.1 Requested patient selection
Here you can find one list field that can be used to filter down the selection of the patients that you need for your research:
1. All patients
2. Tumor/treatment specific (please use the 'specify specific patient selection' field to specity details)
3. Only the data used in the Priestley et al paper
4. The data used in the Priestley et al paper, filtered on tumor type and/or specific treatment (please use the 'specify specific patient selection' field to specity details)
5. Other filtering requirements (please use the 'specify specific patient selection' field to specity details).

To help you narrow down your selection, you can take a look at:
- [DOID ontology](https://www.ebi.ac.uk/ols/ontologies/doid)
- [Hartwig Primary tumor locations and/or types mapped to DOID ontology](https://hartwigmedical.github.io/documentation/doid.html).

Make sure to motivate your requirements in the field below the selection. This field will be used by both the Scientific Board and Data Access Board to decide if your selection is not too broad.

#### 3.2 Requested clinical data
The clinical data will be given out as metadata for each sample. We have four types of 'metadata' available for each of the patients in the database:
1. Tumour data (general aspects of the sample, primary tumour location, biopsy location)
2. Patient data (year of birth, gender)
3. Previous treatment data (ie pre-treatment, information about treatments that were received previously to taking the biopsy)
4. Post-biopsy treatment with response data (drugs given after the biopsy, response data)

#### 3.3 Requested genomics data
For all samples in our database, we give out genomics data that is processed in exactly the same manner. This makes bulk-comparisons and analyses easy. There are four types of data available to request:
- Somatic data originating from the analysis on the sequenced DNA (SNVs, MNVs, INDELs, SVs, Copy number data, LINX data, and other more specific data types)
- Germline data originating from the analysis on the sequenced DNA (this is given out in the form of a VCF file)
- Aligned readout DNA data (tumor and normal CRAM + CRAI files)
- RNA-seq fastq files (tumor only, not available for all samples)
- Other (if you require something specific, please let us know in this section. Please keep in mind that we are not always able to facilitate all needs, as we process a lot of requests and time is often a limiting factor)

Please motivate the choices you make above, as this again is taken into account in the approval of your request.

#### 3.4 Minimum number of patients whose data is required for the proposed project
Please try to make an estimation of the number of patients that you will need to successfully complete your project. Also motivate this estimation. This gives us an indication of the feasibility of your project, using the Hartwig Medical Foundation data. When you send in your application, we will fill in the section 'Number of patients available' based on your patient selection and requirements. 

#### 3.5 Time you expect to need the requested data for the project
This again allows us to estimate the feasibility of your project and is also needed for drafting up the License Agreement (we will allow you access to the data for a limited number of years, appropriate to your project). 

### Part 4: Research context
This section is needed for us to get an insight in the feasibility of your project. Please fill in the details. 

In section 4.1, please specify the persons you are going to share your analysed results with, if you are planning on doing so. 

### Part 5: Other remarks
If there are other remarks that you'd like to let us know beforehand or that might influence our decision on approving or declining your request, please let us know in this section. If you're creating an application as an addendum or extension of a previous request, please also add this information to this section.

### Part 6: Guarrantees
Make sure to read the documentation that is stated in this section before agreeing with the contents and making sure you're up to date on all limitations and regulations when your Data Access Request is approved. 

### Part 7: Signing
This section will only be available after your application is reviewed and approved for starting the official reviewing by our Scientific Board and Data Access Board. 
As there is only one log in available for each request, we tend to see that the main applicant lets other involved persons sign on their device. If you are experiencing problems signing, please [contact us](https://www.hartwigmedicalfoundation.nl/contact/).

## Running into problems
If you are somehow running into problems while filling in your Data Access Request application, do not hesitate to [contact us](https://www.hartwigmedicalfoundation.nl/contact/). 

## More information about the procedure
The most up-to-date information regarding the procedure of the Data Access Requests can be found on [our website](https://www.hartwigmedicalfoundation.nl/applying-for-data/).
