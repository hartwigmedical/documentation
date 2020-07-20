# Frequently Asked Questions

This page contains the frequently asked questions regarding Hartwig Medical Foundation Data Access Requests. Please note that this page is not exhaustive and that you should consult your License Agreement regarding the exact agreements that were made between Hartwig Medical Foundation and your institute.

- [General Questions](#general-questions)
- [Google Cloud Platform Questions](#google-cloud-platform-questions)
- [Billing Questions](#billing-questions)

## General Questions

<details>
<summary>Where can I find information about the procedure for Hartwig Medical Foundation's Data Access Requests?</summary>

You can find all details regarding the Data Access Procedure at [our website](https://www.hartwigmedicalfoundation.nl/applying-for-data/).
</details>

<details>
<summary>Is it possible to collaborate while using your data?</summary>

Collaboration is possible on the following grounds:
- The person(s) you are collaborating with will not have access to the raw Hartwig Medical Foundation data that is shared with you through GCP. Only the people that are mentioned in your Data Access Request and registered 'Download Contacts' are allowed to access the raw Hartwig Medical Foundation data. You are allowed to share the results of your analysis.
- If you need your collaborator to have access to the raw data as well, please add him/her as a 'Download contact'. For a collaborator to be added as a 'Download contact', he/she needs to be appointed within the same 'Legal Entity' or institution. See instructions [on this page, section 'New User procedure'](https://www.hartwigmedicalfoundation.nl/applying-for-data/). 
- If your collaborator does not work at the same institute (or 'Legal Entity'), you need to put in a new Data Access Request and add your collaborator in the 'Consortium request' part of the application. A License Agreement will be drafted that allows people from multiple institutions to collaborate on analysing the raw data.
- It is not possible to request data as a consortium, as this is no official 'Legal Entity'.
</details>

<details>
<summary>How is the data processed / Can I use your tools?</summary>

An [overview of the methods for data collection](./data-access-request-methods.md) is available, as well as a [guide that describes the data that we make available](./data-access-request-guide.md).

All our tools and code is publicly available on [our GitHub](https://github.com/hartwigmedical). 
</details>

## Google Cloud Platform Questions

<details>
<summary>Why can't I sign up with my Gmail account?</summary>

As you may know, the data included in the database of Hartwig Medical Foudation is very sensitive information and concerns health and genetic data of patients. In view hereof, Hartwig Medical Foundation must ensure that the data that it makes available for research is only used for the purposes for which the data is made available and by the persons authorized to access it. Further, it wishes to safeguard as much as possible that the data are duly processed and protected, once made available for research. It is in view hereof that Hartwig Medical Foundation makes available the data to legal entities (such as the institution you are working for), why the data access request is submitted on behalf of your institution and why the license agreement covering the use of data is entered into by your institution. It is your institution that is responsible for compliance with the terms of the license agreement. By requiring you to use your institution email address, we can ensure that you are indeed working for the institution that was granted access to the data and that you will no longer have access to the data once you no longer work for the institution (and are no longer authorized to access the data). Further, your institution’s email account is often better secured than a private email account. So in brief, we require you to use your institution email address to access the data from Hartwig Medical Foundation in order to protect the data.
</details>

<details>
<summary>Is it possible to have an admin email address in my GCP project?</summary>

No, we can only allow **personal institutional email addresses** as GCP accounts to release the data to. When releasing data to a service account, an admin account may be added to the project, but can't have the rights to access the service account that the data is linked to. Please see the question right above this one for the specific explanation why we can't allow this.
</details>

<details> 
<summary>What can I do with a service account on GCP?</summary>

A service account allows you to process the data that you can access through the ACL in a more efficient way, as you're able to automatise. With a service account, you can spin up multiple VMs simultaniously in one go, whereas with your personal GCP account, you'd have to do this for each sample seperately. 
</details>

<details>
<summary>Why do you need to audit my service account?</summary>

We need to audit your project IAM settings when you want to use a service account for data access, as we want to make sure only the registered 'Download contacts' have access to the data (through restricted access to the service account), as agreed upon in the License Agreement. The audit is performed like this:
- You will need to add one of the Hartwig employees to your project with the role 'Viewer', so he/she is able to see the users with access to your project via IAM.
- Our Hartwig employee will take a look at the users within your project and register the accounts and roles with access.
- Then Hartwig will check if the users with priviledged access are also registered 'Download contacts' on the data access request documentation. We only allow the following scenarios:
    - Only the download contact has an account in the project (and multiple service accounts are allowed)
    - The download contact has an account in the project, and is the only one that can work with the service account. This means that there are other users allowed, but their roles should not be one of the following (the below roles give a user access to all service accounts within a project):
        - Owner
        - Editor
        - Service Account User
- When this is all in order, you will be notified by us and the data collection is started.
</details>

<details>
<summary>I can't seem to set up a GCP account with my institutional email address?</summary>

Please follow the instructions in our [Getting a Google account](https://hartwigmedical.github.io/documentation/getting-a-Google-account.html) documentation. In short, go to the [Google Account creation page](https://accounts.google.com/signup?hl=en), click 'Use my current email address instead' and follow the prompts. Please note that we need multi-factor authentication enabled for all accounts we share our data with.
</details>

<details>
<summary>Can you help us with setting up a GCP account?</summary>

We are not able to set the GCP account up for you. Instructions on getting a GCP account can be found in our [Getting a Google account](https://hartwigmedical.github.io/documentation/getting-a-Google-account.html) instructions. If the instructions are somehow not working for you, please [contact us](https://www.hartwigmedicalfoundation.nl/en/contact-us/). We might be able to point you to someone that can assist you in the process.
</details>

## Billing Questions

<details>
<summary>Will I be billed for accessing your data?</summary>

We don't personally bill you for accessing our data, but accessing the data through Google Cloud Platform does come with costs. Basically, there are two ways to approach the data:
- **Download the data onto your own servers**. This will result in egress costs (data that is pulled over the network will be charged per GB, see [Google's Network Pricing page](https://cloud.google.com/compute/network-pricing) for more details.
- **Analyse the data on GCP itself**. This will results in storage and compute costs. More information can be found on [Google's Cloud Storage pricing page](https://cloud.google.com/storage/pricing) and [Google's VM Instances pricing page](https://cloud.google.com/compute/vm-instance-pricing). If you analyse the data in the same region as it is stored, you won't be charged egress costs. 

What option to choose depends on your use case and specific requirements. 
</details>

<details>
<summary>How much will I get billed for my download?</summary>

A resource that might help you in estimating costs is the [Google Pricing calculator](https://cloud.google.com/products/calculator). Another factor that you need to include when estimating cost, is the [cost for egress](https://cloud.google.com/compute/network-pricing).
</details>

<details>
<summary>I'm worried about incurring costs on GCP, how can I make sure I stay within budget?</summary>

There is no hard cap to cut off costs at a certain point, but there are several options to monitor your budget within GCP:
- [Set budgets and budget alerts in GCP](https://cloud.google.com/billing/docs/how-to/budgets?hl=en&visit_id=637285189607967041-935235730&rd=1). This option does not let you cap the budget, but allows you to monitor everything and set reminders at appropriate amounts of money spend.
- [Examples of automated cost control responses](https://cloud.google.com/billing/docs/how-to/notify). Here you can find examples on shutting down VMs when the bill reaches a certain amount within a project.
</details>
