
# Hartwig Medical Foundation Data Access Request Guide 

This page provides practical information on how to access / work with the data that will be made available to you within the context of a Data Access Request (DR) from Hartwig Medical Foundation. 

Note: more details on the methods used to generate both the genomic and clinical data can be found on a separate [Methods](./data-access-request-methods.md) page.

## Contents

* [General notes](#general-notes)
* [Sample selection](#sample-selection)
* [Primary tumor location and type via DOID ontology](#primary-tumor-location-and-type-via-doid-ontology)
* [Format of the data made available](#format-of-the-data-made-available)
  - [Clinical Data (TSV format)](#clinical-data-tsv-format)
  - [Somatic Data (VCF/TXT formats)](#somatic-data-vcftxt-formats)
  - [Germline Data (VCF/TXT formats)](#germline-data-vcftxt-formats)
  - [Aligned readout data (CRAM format)](#aligned-readout-data-cram-format)
  - [RNAseq data (FASTQ format)](#rna-seq-data-fastq-format)
  - [More information](#more-information)

## General Notes
 - Please be aware that the sample IDs provided to you are not publicly shareable. In case you want to publish something with respect to a specific sample from the Hartwig Medical Foundation database you need to use the Hartwig Sample ID for this. For newer DRs these have been made available; for older requests these can be requested for the samples you have been provided. 
 - Internally at Hartwig, we load up all data into a MySQL database. The scheme and code to set this up yourself can be found on our [resources page](https://resources.hartwigmedicalfoundation.nl/).
 
Please use the **unique ID** given to your request (eg. "DR-XXX") in any communication with us about your data request.


## Sample selection

By default, in addition to data-request specific criteria, samples for which one of the below applies are **excluded**:

- Samples with PURPLE qcStatus != PASS:
      Samples with poor quality;
      Samples without any tumor evidence;
      Samples with less than 19.5% tumor cells.
- Samples with insufficient coverage.


## Primary tumor location and type via DOID ontology

The primary tumor location and/or type of the samples in the database are mapped to the DOID ontology (as detailed as possible on available data, for information of the DOID ontology system see: [https://www.ebi.ac.uk/ols/ontologies/doid](https://www.ebi.ac.uk/ols/ontologies/doid)). Please find the tree of the doids in the Hartwig Medical Foundation database  [here](doid.html). 


## Format of the data made available

- [Clinical Data (TSV format)](#clinical-data-tsv-format)
- [Somatic Data (VCF/TXT formats)](#somatic-data-vcftxt-formats)
- [Germline Data (VCF/TXT formats)](#germline-data-vcftxt-formats)
- [Aligned readout data (CRAM format)](#aligned-readout-data-cram-format)
- [RNA-seq data (FASTQ format)](#rna-seq-data-fastq-format)
- [More information](#more-information)

### Clinical Data (TSV format)

Clinical data will be made available in a **metadata.tar** via GCP.

Some notes about the clinical data:
- As much information as possible from the Electronic Case Report Form (eCRF) of the respective clinical studies is gathered. Please be aware that records are not guaranteed to be complete.
- For patients who participated in the DRUP study we can not share any treatment related information.
- The "purity" field in the metadata is the percentage tumor cells derived from WGS data by [PURPLE](https://github.com/hartwigmedical/hmftools/tree/master/purity-ploidy-estimator).

Please find more details on the methods used to generate both the genomic and clinical data on a separate [Methods](./data-access-request-methods.md) page.

### Somatic Data (VCF/TXT formats)

Somatic data will be made available in a **somatics.tar** via GCP.

##### Per sample the following files are present:
- purple.somatic.vcf.gz (somatic SNVs and small INDELs)
- purple.sv.ann.vcf.gz (somatic structural variants)
- purple.cnv.somatic.tsv (somatic copy number regions)
- purple.cnv.gene.tsv (somatic copy number per gene)
- purple.purity.tsv (implied percentage of tumor cells)
- purple.purity.range.tsv (in depth information about purity measure)
- purple.qc (quality control outcome)
- purple.version (purple version used)
- circos.png (genome wide plot)
- driver.catalog.tsv (affected driver genes)
- purple.cnv.germline.tsv (germline copy number regions) *[in case germline level is part of request]*

For an explanation of the contents of these files, see [PURPLE](https://github.com/hartwigmedical/hmftools/tree/master/purity-ploidy-estimator).  

### Germline Data (VCF/TXT formats)

Germline data will be made available in a **germline.tar** file via GCP.

We share the SNVs and small INDELs called from the reference sample using GATK haplotype caller.

### Aligned readout data (CRAM format)

Aligned readout data will be made available per sample via GCP.

Some notes to keep in mind:
- Files can be very large (up to 300GB) so consider this when you want to egress the files (comes with costs, see [Accessing Hartwig Medical Foundation data through GCP](./accessing-hartwig-data-through-gcp.md)).

##### Example loading CRAM file in IGV:
It is possible to directly load CRAM files into IGV using the Google Cloud Storage URL. Please note that to do this, IGV requires your permission to access both Google Cloud Storage and Google Drive. It is at this time not possible to exclude Google Drive from these permissions. To load a CRAM file directly from Google Cloud Storage:
- Open the IGV program and choose option 'Google' > 'Login' from the menu bar
- Log in to your Google Account
- Set the GCP project that will be used for billing the (small amount of) egress cost by choosing 'Google' > 'Enter Project ID'
- Choose option 'File' > 'Load from URL'
- Paste the CRAM file gs:// URL at field 'File URL'
- Paste the CRAI file gs:// URL at field 'Index URL'

Please find more details on the methods used to generate both the genomic and clinical data on a separate [Methods](./data-access-request-methods.md) page.

### RNA-seq data (FASTQ format)

RNA-seq data will be made available per sample via GCP.

Some notes to keep in mind:
- Files can be very large so consider this when you want to egress the files (comes with costs, see [Accessing Hartwig Medical Foundation data through GCP](./accessing-hartwig-data-through-gcp.md)).

### More information
- For source code of our analysis pipeline see our [pipeline5 repository](https://github.com/hartwigmedical/pipeline5)
- For source code of all Hartwig Medical Foundation tools see our [hmftools repository](https://github.com/hartwigmedical/hmftools)
- For an example patient report see our [resources page](https://resources.hartwigmedicalfoundation.nl/)
- For various resource files used in the analysis see our [resources page](https://resources.hartwigmedicalfoundation.nl/)