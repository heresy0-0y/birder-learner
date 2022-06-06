OLD README
#### :App Title: 
fortress of biodiverservitude 

#### :Description: 
the fortress enables users to interact with species occurrences by location. By consuming the Gloabal Biodiversity Infiormation Facility's API to access records from scientists, both instutionally backed and citizen alike, across the planet, making this already widely accessible data even more inviting to the average image//non-text attentive web surfer.

#### :API:
https://api.gbif.org/v1/

i plan to get images (still and/or moving), sound and location of occurrences. 
for now, species will be restricted to birds to ensure a geographically close match with sound and/or image exists.

#### :API Snippet:
~~~
{
    "offset": 0,
    "limit": 1,
    "endOfRecords": false,
    "count": 13691,
    "results": [
        {
            "key": 2550010453,
            "datasetKey": "50c9509d-22c7-4a22-a47d-8c48425ef4a7",
            "publishingOrgKey": "28eb1a3f-1c15-4a95-931a-4af90ecb574d",
            "installationKey": "997448a8-f762-11e1-a439-00145eb45e9a",
            "publishingCountry": "US",
            "protocol": "DWC_ARCHIVE",
            "lastCrawled": "2020-12-19T14:48:48.451+0000",
            "lastParsed": "2020-12-19T16:56:44.477+0000",
            "crawlId": 244,
            "hostingOrganizationKey": "28eb1a3f-1c15-4a95-931a-4af90ecb574d",
            "extensions": {
                "http://rs.gbif.org/terms/1.0/Multimedia": [
                    {
                        "http://purl.org/dc/terms/format": "audio/mpeg",
                        "http://rs.tdwg.org/dwc/terms/catalogNumber": "54018",
                        "http://purl.org/dc/terms/references": "https://www.inaturalist.org/observations/37257292",
                        "http://purl.org/dc/terms/identifier": "https://static.inaturalist.org/sounds/54018.mp3?1578125176",
                        "http://purl.org/dc/terms/publisher": "iNaturalist",
                        "http://purl.org/dc/terms/created": "2020-01-04T08:06:16Z",
                        "http://purl.org/dc/terms/type": "Sound",
                        "http://purl.org/dc/terms/creator": "lifeisamazing",
                        "http://purl.org/dc/terms/rightsHolder": "lifeisamazing",
                        "http://purl.org/dc/terms/license": "http://creativecommons.org/licenses/by-nc/4.0/"
                    }
                ]
            },
            "basisOfRecord": "HUMAN_OBSERVATION",
            "occurrenceStatus": "PRESENT",
            "taxonKey": 2480115,
            "kingdomKey": 1,
            "phylumKey": 44,
            "classKey": 212,
            "orderKey": 1445,
            "familyKey": 9340,
            "genusKey": 2480103,
            "speciesKey": 2480115,
            "acceptedTaxonKey": 2480115,
            "scientificName": "Calyptorhynchus funereus (Shaw, 1794)",
            "acceptedScientificName": "Calyptorhynchus funereus (Shaw, 1794)",
            "kingdom": "Animalia",
            "phylum": "Chordata",
            "order": "Psittaciformes",
            "family": "Psittacidae",
            "genus": "Calyptorhynchus",
            "species": "Calyptorhynchus funereus",
            "genericName": "Calyptorhynchus",
            "specificEpithet": "funereus",
            "taxonRank": "SPECIES",
            "taxonomicStatus": "ACCEPTED",
            "dateIdentified": "2020-01-04T08:06:11",
            "decimalLongitude": 152.9,
            "decimalLatitude": -31.43304,
            "coordinateUncertaintyInMeters": 5577.0,
            "stateProvince": "New South Wales",
            "year": 2020,
            "month": 1,
            "day": 4,
            "eventDate": "2020-01-04T19:05:00",
            "issues": [
                "COORDINATE_ROUNDED",
                "GEODETIC_DATUM_ASSUMED_WGS84",
                "INSTITUTION_MATCH_NONE",
                "COLLECTION_MATCH_NONE"
            ],
            "modified": "2020-01-05T10:09:11.000+0000",
            "lastInterpreted": "2020-12-19T16:56:44.477+0000",
            "references": "https://www.inaturalist.org/observations/37257292",
            "license": "http://creativecommons.org/licenses/by-nc/4.0/legalcode",
            "identifiers": [],
            "media": [
                {
                    "type": "Sound",
                    "format": "audio/mpeg",
                    "references": "https://www.inaturalist.org/observations/37257292",
                    "created": "2020-01-04T08:06:16.000+0000",
                    "creator": "lifeisamazing",
                    "publisher": "iNaturalist",
                    "license": "http://creativecommons.org/licenses/by-nc/4.0/",
                    "rightsHolder": "lifeisamazing",
                    "identifier": "https://static.inaturalist.org/sounds/54018.mp3?1578125176"
                }
            ],
            "facts": [],
            "relations": [],
            "gadm": {
                "level0": {
                    "gid": "AUS",
                    "name": "Australia"
                },
                "level1": {
                    "gid": "AUS.5_1",
                    "name": "New South Wales"
                },
                "level2": {
                    "gid": "AUS.5.109_1",
                    "name": "Port Macquarie-Hastings"
                }
            },
            "isInCluster": false,
            "geodeticDatum": "WGS84",
            "class": "Aves",
            "countryCode": "AU",
            "recordedByIDs": [],
            "identifiedByIDs": [],
            "country": "Australia",
            "rightsHolder": "lifeisamazing",
            "identifier": "37257292",
            "http://unknown.org/nick": "lifeisamazing",
            "verbatimEventDate": "2020-01-04 7:05:00 PM GMT+11:00",
            "datasetName": "iNaturalist research-grade observations",
            "gbifID": "2550010453",
            "verbatimLocality": "Port Macquarie",
            "collectionCode": "Observations",
            "occurrenceID": "https://www.inaturalist.org/observations/37257292",
            "taxonID": "116845",
            "catalogNumber": "37257292",
            "recordedBy": "lifeisamazing",
            "http://unknown.org/occurrenceDetails": "https://www.inaturalist.org/observations/37257292",
            "institutionCode": "iNaturalist",
            "rights": "© lifeisamazing some rights reserved",
            "eventTime": "08:05:00Z",
            "identifiedBy": "lifeisamazing",
            "identificationID": "82520614"
        }
    ],
    "facets": []
}
~~~
#### :Wireframe:
<img src="https://i.ibb.co/hBGPvyh/Project.png" alt="project-wireframe" border="0">

#### :MVP:
Dropdown country search for species that gets sound, images, and scientific name from the most recent occurrence in the chosen location. Plant images from nearby occurrences will also be retrieved to create a background intended to fill-out what is intended to be felt as a virtual habitat to meet these species that are alive and well.

A button to pull up an overlayed panel gives users resources to get engaged with biodiversity protection initiatives specified to their locale.

A sidebar with three buttons: reset page/"home", About GBIF(to get proper api citation and further info about this awesome database), and the "assist your non-human neighbors"/get engaged.

#### :Post-MVP:
Search by interactive world map, being able to click the relative area to intiate search.

Hover over images(both plant and animal) shows excerpts from species wikipedia entries including endangerment status.

Ability to save/favorite environments by bird species/sound.

A button to randomly generate different plant images in the same location.
Option to list 10 most recent ocurrences in chosen location and choose the species to center media generation around instead of random generation of a single species.

#### :Goals:
|  Day | Deliverable | Status
|---|---| ---|
|Dec 21| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|Dec 21| Project Approval | Incomplete
|Dec 22| Core Application Structure (HTML, CSS, etc.) | Incomplete
|Dec 23| Pseudocode / actual code | Incomplete
|Dec 28| MVP | Incomplete
|Dec 29| Advanced CSS | Incomplete
|Dec 30| 
|Jan 4| Post-MVP | Incomplete
|Jan 5| Presentations | Incomplete

#### :Priority Matrix:

<img src="https://i.ibb.co/tPMj5Vh/Screen-Shot-2020-12-21-at-3-31-28-PM.png" alt="Screen-Shot-2020-12-21-at-3-31-28-PM" border="0">

#### :Timeframes:

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Using API to get data | H | 1hrs| - | - |
| Adding text, images, and sound to DOM | H | 1.5hrs | - | - |
| Adding Dropdown and Search Button functionality/event listeners | H | 2hrs| - | - |
| Adding 'get involved' element (general) | H | 1hrs | - |
| Adding functioning reset button | M | 1hrs | - | - |
| Adding more info/wikipedia excerpt generation for current species | M | 3hrs | - | - |
| Adding GBIF info section | H | 1hrs | - | - |
| Animating CSS | M | 2hrs | - | - |
| Adding search by map option | L | 3hrs | - | - |
|Adding random background/flor regenerator button | L | 3hrs | - | - |
| Total | H | 18.5hrs | - | - |
