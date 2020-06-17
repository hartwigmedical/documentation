# Accessing Data Through GCP

## Contents
* [Overview](#overview)
* [Logging in to GCP](#logging-in-to-gcp)
* [Accessing Data](#accessing-data)
    - [Data request bucket](#data-request-bucket)
    - [Manifest JSON](#manifest-json)
* [GCP Costs](#gcp-costs)
* [Privacy and Security](#privacy-and-security)

## Overview

This guide is meant to give you the basic steps and knowledge to access the data for which you have been approved via the Google Cloud Platform (GCP). It is not meant to be an exhaustive tutorial on GCP, 
and we suggest getting background on the key services in GCP via the following tuturials:

* [Google Cloud Console](https://console.cloud.google.com/)
* [Google Cloud SDK](https://cloud.google.com/sdk)
* [Google Cloud Storage](https://cloud.google.com/storage)
* [Google Compute Engine](https://cloud.google.com/compute) 
 
We assume you have already acquired an account, if not please read our [Getting a Google Account](getting-a-Google-account.md) page in this documentation repository. 

This guide will perform all operations via the command line. Please ensure you've installed the [Google Cloud SDK](https://cloud.google.com/sdk) 
or you can also use the [Cloud Shell](https://cloud.google.com/shell) available in the console. **Note**: The cloud shell runs in a virtual machine, so anything downloaded
locally will not be persisted to your own computer.

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

Note the `-u your-project`, this is necessary to assign the billing project to the request for any egress costs (even though an `ls` does not incur egress, all operations still need a billing account). See the [costs overview](#costs) for more details.

To download files locally or to a VM:

```shell script
gsutil  -u your-project cp gs://hmf-dr-123/metadata.tar /path/on/your/local/machine/
```

To copy the files to another bucket you've created in your own project:

```shell script
gsutil  -u your-project cp gs://hmf-dr-123/metadata.tar gs://your-new-bucket/
```

### Manifest JSON

When dealing with the aligned reads and RNASeq data, our key challenge is avoid any duplication of the data and costs associated. This means we need to expose the data directly to the requester from our own buckets.

To accomplish this we provide the data requester with a JSON file called the manifest, the manifest contains URLs to all CRAMs, their indexes and RNASeq fastq in the request. 
Along with this, we grant your account read access on each object [Access Control List (ACL)](https://cloud.google.com/storage/docs/access-control/lists). 

The `manifest.json` is located in each data request bucket. The intention is to provide a compact representation of the data exposed which can be easily parsed by a script or program, but also easily read in an editor.
The manifest gives you the following information:
- The unique ID of the data request
- The accounts which have access to the data in the manifest
- The Google Cloud Storage (GCS) urls of the aforementioned TAR files
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

The intent of the manifest is to enable the use of GCP to scale analysis horizontally across virtual machines and avoid the time and expense of large downloads. At HMF this generally follows the pattern:
* Create a VM with a predefined startup script.
* Within the startup script, download the data you need
* Within the startup script, run your analysis
* Within the startup script, upload the results to your own bucket
* Terminate the VM

We've also seen the manifest parsed into [Nextflow](https://www.nextflow.io/) configuration which manage the GCP details for you. 
We kept things simple by design, we hope to see many creative analysis implementations with the manifest. 

### GCP Costs

When using any cloud platform, its very important to understand the cost of operations. The good news is, GCP is very competitively priced and will also help alleviate load on internal HPCs and staff.

GCP has a very simple pricing model (linear on CPU, memory and storage) and you can find all the details [here](https://cloud.google.com/pricing) 

When using GCP compute resources we strongly recommend using [Pre-emptible VMs](https://cloud.google.com/compute/docs/instances/preemptible), which will save 80% on CPU and memory. 

We suggest using the [pricing calculator](https://cloud.google.com/products/calculator) to get an estimate for your workload. That said, here are some key costs to keep in mind:
- Using a 32cpu 120GB virtual machine for one hour will cost about $1.60 or $0.30 if pre-emptible.
- Storing 1TB of data for a month will cost about $20.
- *Downloading 1TB of data to a local server will cost about $120/€106*
- Aligning 100 samples sequenced to 90x with BWA and storing CRAM for 1 year costs approximately $3100 (~$700 for the compute and $2400 storage).

### Privacy and Security

When moving to a cloud platform and dealing with personal health data, many have concerns about privacy and security compared to an on-premise storage solution. The reality is that Google has
much more expertise and resources to secure our data and processing than we could provide internally. Have a read of their [white paper](https://cloud.google.com/security/overview/whitepaper) for more details.

That said, we have added additional security and privacy measures to ensure our data is only ever accessed by intended parties:
- All private data is encrypted with our own key using [Customer Managed Encryption](https://cloud.google.com/storage/docs/encryption/customer-managed-keys). This ensures that no one at Google can access our data.
- Any access to private data is logged using [Audit Logging](https://cloud.google.com/logging/docs/audit). 
- [Resource location restriction](https://cloud.google.com/resource-manager/docs/organization-policy/defining-locations) to ensure the data always resides in the EU.
- All VMs we create have private IP and reside on a private network, with no access to the public internet.

It is the responsibility of the requester to ensure that their environment is set up with adequate security and that they are operating with the License Agreement.



