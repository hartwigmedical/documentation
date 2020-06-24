# Frequently Asked Questions
## Hartwig Medical Foundation Data Access Requests

This page contains the frequently asked questions regarding Hartwig Medical Foundation Data Access Requests. Please note that this page is not exhaustive and that you should consult your License Agreement regarding the exact agreements that were made between Hartwig Medical Foundation and your institute.

- [General Questions](#general-questions)
- [Google Cloud Platform Questions](#google-cloud-platform-questions)
- [Billing Questions](#billing-questions)

## General Questions

### Where can I find information about the procedure for Hartwig Medical Foundation's Data Access Requests?
You can find all details regarding the Data Access Procedure at [our website](https://www.hartwigmedicalfoundation.nl/applying-for-data/).

### Is it possible to collaborate while using your data?

Collaboration is possible on the following grounds:
- The person(s) you are collaborating with will not have access to the raw Hartwig Medical Foundation data that is shared with you through GCP. Only the people that are mentioned in your Data Access Request and registered 'Download Contacts' are allowed to access the raw Hartwig Medical Foundation data. You are allowed to share the results of your analysis.
- If you need your collaborator to have access to the raw data as well, please add him/her as a 'Download contact'. For a collaborator to be added as a 'Download contact', he/she needs to be appointed within the same 'Legal Entity' or institution. See instructions [on this page, section 'New User procedure'](https://www.hartwigmedicalfoundation.nl/applying-for-data/). 
- If your collaborator does not work at the same institute (or 'Legal Entity'), you need to put in a new Data Access Request and add your collaborator in the 'Consortium request' part of the application. A License Agreement will be drafted that allows people from multiple institutions to collaborate on analysing the raw data.


## Google Cloud Platform Questions

### Why can't I sign up with my Gmail account?
The License Agreement is signed by your institution (the 'Legal Entity'), which means that your institution will be liable if the License Agreement is breached. As your institution gives you a personal institutional email address, they also manage the access to this account. By using your institutional email address, we have the guarantee that you are acting as a representative of your institution and that your access will be revoked in case of, for example, termination of your contract.

### I can't seem to set up a GCP account with my institutional email address?
Please follow the instructions in our [Getting a Google account](https://hartwigmedical.github.io/documentation/getting-a-Google-account.html) documentation. In short, go to the [Google Account creation page](https://accounts.google.com/signup?hl=en), click 'Use my current email address instead' and follow the prompts. Please note that we need multi-factor authentication enabled for all accounts we share our data with.

### Can you help us with setting up a GCP account?
We are not able to set the GCP account up for you. Instructions on getting a GCP account can be found in our [Getting a Google account](https://hartwigmedical.github.io/documentation/getting-a-Google-account.html) instructions. If the instructions are somehow not working for you, please contact us. We might be able to point you to someone that can assist you in the process.


## Billing Questions

### Will I be billed for accessing your data?
We don't personally bill you for accessing our data, but accessing the data through Google Cloud Platform does come with costs. Basically, there are two ways to approach the data:
- **Download the data onto your own servers**. This will result in egress costs (data that is pulled over the network will be charged per GB, see [Google's Network Pricing page](https://cloud.google.com/compute/network-pricing) for more details.
- **Analyse the data on GCP itself**. This will results in storage and compute costs. More information can be found on [Google's Cloud Storage pricing page](https://cloud.google.com/storage/pricing) and [Google's VM Instances pricing page](https://cloud.google.com/compute/vm-instance-pricing). If you analyse the data in the same region as it is stored, you won't be charged egress costs. 

What option to choose depends on your use case and specific requirements. 

### How much will I get billed for my download?
A resource that might help you in estimating costs is the [Google Pricing calculator](https://cloud.google.com/products/calculator). Another factor that you need to include when estimating cost, is the [cost for egress](https://cloud.google.com/compute/network-pricing).

### I'm worried about incurring costs on GCP, how can I make sure I stay within budget?
There is no hard cap to cut off costs at a certain point, but there are several options to monitor your budget within GCP:
- [Set budgets and budget alerts in GCP](https://cloud.google.com/billing/docs/how-to/budgets?hl=en&visit_id=637285189607967041-935235730&rd=1). This option does not let you cap the budget, but allows you to monitor everything and set reminders at appropriate amounts of money spend.
- [Examples of automated cost control responses](https://cloud.google.com/billing/docs/how-to/notify). Here you can find examples on shutting down VMs when the bill reaches a certain amount within a project.

