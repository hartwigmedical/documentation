
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
* [Example data (COLO829v003T)](#example-data-colo829v003t)
* [More information](#more-information)

## General Notes
 - Please be aware that the sample IDs provided to you are not publicly shareable. In case you want to publish something with respect to a specific sample from the Hartwig Medical Foundation database you need to use the Hartwig Sample ID for this. For newer DRs these have been made available; for older requests these can be requested for the samples you have been provided. 
 - Internally at Hartwig, we load up all data into a MySQL database. The scheme and code to set this up yourself can be found on our [resources page](https://resources.hartwigmedicalfoundation.nl/).
 - After one month of the creation of a bucket, files in the bucket will be removed. On request, we can leave or make the data available for an extended period. After receipt of such a request, we will start making the licensed data available again within one workday. You can submit a request by sending an email to ict@hartwigmedicalfoundation.nl, mentioning your reference number. Note that you still retain continuous access to the files that are shared via manifest.json for the duration of the license agreement.

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

Clinical data will be made available in a **metadata.tsv** via GCP.

Some notes about the clinical data:
- As much information as possible from the Electronic Case Report Form (eCRF) of the respective clinical studies is gathered. Please be aware that records are not guaranteed to be complete.
- For patients who participated in the DRUP study we can not share any treatment related information.
- The "purity" field in the metadata is the percentage tumor cells derived from WGS data by [PURPLE](https://github.com/hartwigmedical/hmftools/tree/master/purity-ploidy-estimator).

Please find more details on the methods used to generate both the genomic and clinical data on a separate [Methods](./data-access-request-methods.md) page.

### Somatic Data (VCF/TXT formats)

Somatic data will be made available in a **somatics.tar.gz** via GCP.

##### Per sample the following files are present:
In the purple folder --
- circos.png (genome wide plot)
- driver.catalog.tsv  (affected driver genes)
- purple.cnv.gene.tsv (somatic copy number per gene)
- purple.cnv.germline.tsv (germline copy number regions) *[only in case germline level is part of request]*
- purple.cnv.somatic.tsv (somatic copy number regions)
- purple.purity.range.tsv (in depth information about purity measure)
- purple.purity.tsv (implied percentage of tumor cells)
- purple.qc (quality control outcome)
- purple.somatic.vcf.gz + purple.somatic.vcf.gz.tbi (somatic SNVs and small INDELs)
- purple.sv.vcf.gz + purple.sv.vcf.gz.tbi (somatic structural variants)
- purple.version  (purple version used)

For an explanation of the contents of the purple. files, see [PURPLE](https://github.com/hartwigmedical/hmftools/tree/master/purity-ploidy-estimator).  

In the linx folder --
- driver.catalog.tsv (reproduction of the driver catalog produced by PURPLE with homozygous disruptions events appended)
- linx.breakend.tsv (impact of each non PON filtered break junction on each overlapping gene)
- linx.clusters.tsv (clustering of all non PON filtered SV events and their resolved classification)
- linx.drivers.tsv  (linkage of drivers from driver catalog to SV cluster which contributed to those drivers)
- linx.fusion.tsv (inframe and out of frame fusions)
- linx.links.tsv (chromosomal segments joining break junction pairs predicted to be linked and phased in cis on the derivative chromosome)
- linx.svs.tsv (structural variant annotations)
- linx.viral_inserts.tsv (viral insertions)
- linx.vis_copy_number.tsv 
- linx.vis_fusion.tsv 
- linx.vis_gene_exon.tsv
- linx.vis_protein_domain.tsv
- linx.vis_segments.tsv
- linx.vis_sv_data.tsv
    *the .vis_ files are visualisations. 
- linx.version (linx version used)

For an explanation of the contents of the linx. files, see [LINX](https://github.com/hartwigmedical/hmftools/tree/master/sv-linx).

### Germline Data (VCF/TXT formats)

Germline data will be made available via GCP.

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

## Example data (COLO829v003T)

COLO829v003T is a melanoma cell line that can be used for testing. The COLO829v003T somatic tar file (different pipeline versions) can be downloaded from our [resources page](https://nextcloud.hartwigmedicalfoundation.nl/s/LTiKTd8XxBqwaiC?path=%2FData-Access-Requests). We also have the COLO829v003T available on the Google Cloud Platform (somatic and germline tar file, and the cram files). To be added to the ACL of these files please send an email to ict@hartwigmedicalfoundation.nl including the GCP account the data should be made available for (please note this should be a GCP account set up with an institutional email address, see [Getting Started with Google Cloud Platform](./getting-a-Google-account.md)).

## More information
- For source code of our analysis pipeline see our [pipeline5 repository](https://github.com/hartwigmedical/pipeline5)
- For source code of all Hartwig Medical Foundation tools see our [hmftools repository](https://github.com/hartwigmedical/hmftools)
- For an example patient report see our [resources page](https://resources.hartwigmedicalfoundation.nl/)
- For various resource files used in the analysis see our [resources page](https://resources.hartwigmedicalfoundation.nl/)
