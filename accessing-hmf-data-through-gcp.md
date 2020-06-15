# Accessing Data Through GCP

## Contents
* [Overview](#overview)
* [Logging in to GCP](#logging-in-to-GCP)
* [Accessing Data](#accessing-data)
    - [Data request bucket](#data-request-bucket)
    - [Large files and the Manifest JSON](#manifest-json)
* [Creating a VM](#creating-a-vm)
* [GCP Costs](#costs)
* [Privacy and Security](#privacy-and-security)

## Overview

This guide is meant to give you the basic steps and knowledge to access the data for which you have been approved via the Google Cloud Platform (GCP). It is not meant to be an exhaustive tutorial on GCP, 
and we suggest getting background on the key services in GCP via the following tuturials:

* [Google Cloud Console](https://console.cloud.google.com/)
* [Google Cloud SDK](https://cloud.google.com/sdk)
* [Google Cloud Storage](https://cloud.google.com/storage)
* [Google Compute Engine](https://cloud.google.com/compute) 
 
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

We create a unique bucket for each data request which contains:
- If applicable, a metadata.tar containing the [clinical data](data-access-request-guide.html#clinical-data-tsv-format)
- If applicable, a somatics.tar containing the [somatic data](data-access-request-guide.html#somatic-data-vcftxt-formats)
- If applicable, a germline.tar containing the [germline data](data-access-request-guide.html#germline-data-vcftxt-formats)
- A manifest JSON file, which will contain Google Storage URLs to any DNA cram or RNASeq fastq data.

You will receive this bucket name from our data request service team, but it will look something like: `hmf-dr-123`, and you can inspect it with gsutil like so:

```shell script
gsutil -u your-project ls gs://hmf-dr-123
```

Note the `-u your-project`, this is necessary to assign the billing project to the request for any egress costs (even though an `ls` does not incur egress, all operations still need a billing account ). See the [costs overview](#costs) for more details.

To download files locally or to a VM:

```shell script
gsutil  -u your-project cp gs://hmf-dr-123/metadata.tar /path/on/your/local/machine/
```

To copy the files to another bucket you've created in your own project:

```shell script
gsutil  -u your-project cp gs://hmf-dr-123/metadata.tar gs://your-new-bucket/
```

### Large files and the Manifest JSON

When dealing with the aligned reads and RNASeq data, our key challenge is avoid any duplication of the data and costs associated. This means we need to expose the data directly to the requester from our own buckets.

To accomplish this we provide the data requester with a JSON file called the manifest, the manifest contains URLs to all CRAMs, their indexes and RNASeq fastq in the request. 
Along with this, we grant your account read access on each object [Access Control List (ACL)](https://cloud.google.com/storage/docs/access-control/lists). 

The `manifest.json` is located in each data request bucket. The intention is to provide a compact representation of the data exposed which can be easily parsed by a script or program, but also easily read in an editor.
The manifest gives you the following information:
- The unique ID of the data request
- The accounts which have access to the data in the manifest
- The GCS urls of the aforementioned TAR files
- For each sample in the datarequest
    - The GCS urls of CRAM and CRAI files (if requested and approved)
    - The GCS urls of RNASeq FASTQ files (if requested and approved)
    
You can find an example [here](manifest.json)

JSON has good support in most programming languages. For instance with python you can load the manifest straight from GCS into a dict in a few lines:

```python
import json
from google.cloud import storage
client = storage.Client()
bucket = client.get_bucket('gs://hmf-dr-123')
manifest_json =  bucket.get_blob('manifest.json')
data = json.loads(manifest_json)
```




