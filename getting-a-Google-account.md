# Getting Started with Google Cloud Platform

- [Introduction](#introduction)
- [Self-Service](#self-service)
- [Google Certified Partner](#google-certified-partner)
- [Direct with Google](#direct-with-google)

## Introduction
All Hartwig Medical Foundation data and data processing is hosted on the [Google Cloud Platform (GCP)](https://cloud.google.com/). GCP provides the storage scale needed to offer access to the entire Hartwig Medical Foundation dataset, including more than a petabyte of raw reads. Furthermore, hosting the data in a cloud environment gives Licensees the ability to bring their analysis to the data, avoiding long download times, expensive on-premise storage and security and privacy issues associated with multiple copies of the data. GCP has a variety of services which can be used to analyse the data at scale, from single on-demand virtual machines to Spark clusters. 

When your Data Access Request is granted, we will need a valid GCP account for the authorised Licensee. This account can be created from any **valid personal email address from your institution** connected to the License Agreement, and will be your login to the system. In any case, this email address should be included in the original Data Access Request as connecting new email addresses to your License Agreement will involve extra paperwork to ensure GDPR-compliant documentation of data access.

This document outlines the process for acquiring an account for Hartwig Medical Foundation data access and integrating it with your computational requirements, including potentially relevant financial/accounting and internal IT organisation aspects. We strongly suggest you start this process as soon as possible when initiating a Data Access Request, so that when we make the data available there are no barriers to begin working with it.

## Self-Service
The simplest way to access GCP is to use the self-service option with a credit card attached to your account for billing. The advantage of this method is the speed of setup and convenience, you can have your account created and ready within minutes. The disadvantage is that the credit card you use must have sufficient funds for your workloads. Furthermore, if you want to use this account to scale up your analyses, you will likely have issues getting access to sufficient resources.
Therefore, <ins>we recommend this path solely for the Licensees who only want to download a small amount of data for ad hoc analysis</ins>. For instance, VCF files to parse and load into a local database, R studio or notebook. Please do note that egress of data from GCP is always associated with costs outlined [here](https://cloud.google.com/compute/network-pricing).

To create a self-service account navigate to the [GCP console](https://console.cloud.google.com/). When prompted to log-in click the “Create Account” link and follow the steps. **Make sure you use the personal email address from your institution which was listed on the Hartwig Medical Foundation Data Access Request application.** 
*Important: do not use your institute email address as alternate email address on your GCP account set up with a gmail address; also, do not add a gmail address to the GCP account you set up with your institute email address.  We will do regular ACL/IAM permission checks on data that is made available for a Data Access Request. This enables us to monitor the existence of a gmail address related to the GCP account for which the data is made available. If we monitor this, we directly need to revoke access since this is a breach of the Licence Agreement.*
If for some reason you cannot create a GCP account with your institute email address, please contact <dataaccess@hartwigmedicalfoundation.nl> and we can help find a solution. When you create an account **please ensure you have [2FA authentication enabled](https://support.google.com/accounts/answer/185839?co=GENIE.Platform%3DDesktop&hl=en)** as this is **obligatory** for Hartwig Medical Foundation data use (and specified in the License Agreement that your organisation signs with Hartwig Medical Foundation).

Once you have signed in to the console you can create a billing account by following the instructions [here](https://cloud.google.com/billing/docs/how-to/manage-billing-account), or by claiming the complimentary $300 credit (at the time of writing and courtesy of Google) by clicking on the link in the banner. The self-service option requires a valid credit card for billing, which can be an institutional or personal card.


## Google Certified Partner
You can also set up an organisational account(s) with Google via a certified Partner. A partner works with Google to provide you with guidance, support and will manage invoicing and payment. If your IT department already works with a certified Partner, this can be an effective and quick way to get an institutional account created, leveraging existing legal arrangements with a group already familiar with your organisation. Partners can also provide you with services and support to help get the most out of the platform. An account created with a partner will be invoiced via your finance department and will be much less restricted when it comes to resource quotas.

A complete list of partners can be found [here](https://cloud.withgoogle.com/partners/), most large IT consulting firms are also Google certified partners. The first step is to get in touch with your internal IT department and determine if you already have an existing relationship with a partner. If so, contact their sales department and go from there.

We recommend this path for Licensees wishing to take full advantage of processing capabilities in the cloud, doing analysis on large sets of raw data in parallel, and/or would benefit from additional technical support from a group with GCP expertise. 

## Direct with Google
It is also possible to set up a direct business to business account with Google. In this setup your organisation will create a contract with Google (Cloud Master Agreement) and your finance department will receive invoices directly from Google. 

This arrangement has the same benefits as a partner in regards to resource access and billing. It can also be an advantage for an organisation with a strong IT team to reduce the overhead and cost of a partner. However arranging a contract can take a significant amount of time and negotiation if you need to deviate from their standard agreement for company policy reasons.

To start the process of creating a direct relationship with Google you can find your local sales team [here](https://cloud.google.com/contact).

We recommend this path for Licensees wishing to take full advantage of processing capabilities in the cloud, doing analysis on large sets of raw data, but feel confident enough to architect their own cloud setup internally.

