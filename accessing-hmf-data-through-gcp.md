# Accessing Data Through GCP

## Contents
* [Overview](#overview)
* [Logging in to GCP](#logging-in-to-GCP)
* [Accessing Data](#accessing-data)
    - [Data request bucket](#data-request-bucket)
    - [Manifest JSON](#manifest-json)
* [Creating a VM](#creating-a-vm)
* [GCP Costs](#costs)
* [Privacy and Security](#privacy-and-security)

## Overview

This guide is meant to give you the basic tools and knowledge to access the data for which you have been approved via the Google Cloud Platform (GCP). It is not meant to be an exhaustive tutorial on GCP, 
and we suggest getting background on the key services in GCP via the following tuturials:

* Google Cloud Console
* Google Cloud SDK
* Google Cloud Storage
* Google Compute Engine 
 
We assume you have already acquired and account, if not please read our [Getting a Google Account](getting-a-Google-account.md) page in this documentation repository. 

This guide will perform all operations via the command line. Please ensure you've installed the Google Cloud SDK.

## Logging in to GCP

Log into the SDK with the following command:

```shell script
gcloud auth login
```

You will be taken to a browser to authenticate. Authenticate with the account with which you applied for the data access. You can check which account is authenticated with:

```shell script
gcloud auth list
``` 

## Accessing data

All data access will be performed with the [gsutil](https://cloud.google.com/storage/docs/gsutil) or via the Google Cloud Storage APIs. We recommend gsutil for most use cases.

### Data Request Bucket

