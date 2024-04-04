export const calendarRowData = {
  uuid: "19be281f-cd09-4b6f-9ae7-caee8d3021e1",
  name: "Methyl-Prednisolone Acetate 40 mg/mL Vial",
  dosingInstructions: {
    dosage: "10mg",
    route: "Intravenous",
    emergency: true,
  },
  firstSlotStartTime: 1706090380,
  slots: [
    {
      id: 20,
      uuid: "ae90d8e8-22b9-44f3-afdf-d899c034d451",
      serviceType: "MedicationRequest",
      status: "COMPLETED",
      startTime: 1706495400,
      order: {
        uuid: "d2cd8d35-4c40-4656-abb3-469e6200ccfb",
        orderNumber: "ORD-22813",
        accessionNumber: null,
        patient: {
          uuid: "8f7c45d9-ec2b-411e-82b4-3b19fb2eb60e",
          display: "ET55749 - IPD New Patient",
        },
        action: "NEW",
        careSetting: {
          uuid: "c365e560-c3ec-11e3-9c1a-0800200c9a66",
          name: "Inpatient",
          description: "In-patient care setting",
          retired: false,
          careSettingType: "INPATIENT",
          display: "Inpatient",
          resourceVersion: "1.10",
        },
        previousOrder: null,
        dateActivated: "2024-01-24T11:47:08.000+0530",
        scheduledDate: "2024-01-24T11:47:07.000+0530",
        dateStopped: null,
        autoExpireDate: "2024-02-03T11:47:06.000+0530",
        encounter: {
          uuid: "d3a504cb-522e-4b68-8d78-0c5749d7889f",
          display: "Consultation 01/24/2024",
        },
        orderer: {
          uuid: "c1c26908-3f10-11e4-adec-0800271c1b75",
          display: "Super Man",
        },
        orderReason: null,
        orderReasonNonCoded: null,
        orderType: {
          uuid: "131168f4-15f5-102d-96e4-000c29c2a5d7",
          display: "Drug Order",
          name: "Drug Order",
          javaClassName: "org.openmrs.DrugOrder",
          retired: false,
          description: "An order for a medication to be given to the patient",
          conceptClasses: [
            {
              uuid: "8d490dfc-c2cc-11de-8d13-0010c6dffd0f",
              display: "Drug",
            },
          ],
          parent: null,
          resourceVersion: "1.10",
        },
        urgency: "ON_SCHEDULED_DATE",
        instructions: null,
        commentToFulfiller: null,
        display:
          "(NEW) Combintation Chlorpheniramine, Paracetamol and Pseudophedrine 100 mL Syrup (Cough and Cold Syrup): null",
        drug: {
          uuid: "a5e9270f-dd5a-49a1-9287-2fd611e59205",
          display:
            "Combintation Chlorpheniramine, Paracetamol and Pseudophedrine 100 mL Syrup (Cough and Cold Syrup)",
        },
        dosingType:
          "org.openmrs.module.bahmniemrapi.drugorder.dosinginstructions.FlexibleDosingInstructions",
        dose: 10,
        doseUnits: {
          uuid: "9d65f54b-3f10-11e4-adec-0800271c1b75",
          display: "ml",
          name: {
            display: "ml",
            uuid: "9d65fb80-3f10-11e4-adec-0800271c1b75",
            name: "ml",
            locale: "en",
            localePreferred: true,
            conceptNameType: "FULLY_SPECIFIED",
            resourceVersion: "1.9",
          },
          conceptClass: {
            uuid: "8d492774-c2cc-11de-8d13-0010c6dffd0f",
            display: "Misc",
          },
          set: false,
          version: null,
          retired: false,
          descriptions: [],
          mappings: [],
          answers: [],
          setMembers: [],
          attributes: [],
          resourceVersion: "2.0",
        },
        frequency: {
          uuid: "9d84890a-3f10-11e4-adec-0800271c1b75",
          display: "Four times a day",
        },
        asNeeded: false,
        asNeededCondition: null,
        quantity: 400,
        quantityUnits: {
          uuid: "9d65f54b-3f10-11e4-adec-0800271c1b75",
          display: "ml",
          name: {
            display: "ml",
            uuid: "9d65fb80-3f10-11e4-adec-0800271c1b75",
            name: "ml",
            locale: "en",
            localePreferred: true,
            conceptNameType: "FULLY_SPECIFIED",
            links: [
              {
                rel: "self",
                uri: "http://localhost/openmrs/ws/rest/v1/concept/9d65f54b-3f10-11e4-adec-0800271c1b75/name/9d65fb80-3f10-11e4-adec-0800271c1b75",
                resourceAlias: "name",
              },
              {
                rel: "full",
                uri: "http://localhost/openmrs/ws/rest/v1/concept/9d65f54b-3f10-11e4-adec-0800271c1b75/name/9d65fb80-3f10-11e4-adec-0800271c1b75?v=full",
                resourceAlias: "name",
              },
            ],
            resourceVersion: "1.9",
          },
          datatype: {
            uuid: "8d4a4c94-c2cc-11de-8d13-0010c6dffd0f",
            display: "N/A",
            links: [
              {
                rel: "self",
                uri: "http://localhost/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f",
                resourceAlias: "conceptdatatype",
              },
            ],
          },
          conceptClass: {
            uuid: "8d492774-c2cc-11de-8d13-0010c6dffd0f",
            display: "Misc",
            links: [
              {
                rel: "self",
                uri: "http://localhost/openmrs/ws/rest/v1/conceptclass/8d492774-c2cc-11de-8d13-0010c6dffd0f",
                resourceAlias: "conceptclass",
              },
            ],
          },
          set: false,
          version: null,
          retired: false,
          names: [
            {
              uuid: "9d65fb80-3f10-11e4-adec-0800271c1b75",
              display: "ml",
              links: [
                {
                  rel: "self",
                  uri: "http://localhost/openmrs/ws/rest/v1/concept/9d65f54b-3f10-11e4-adec-0800271c1b75/name/9d65fb80-3f10-11e4-adec-0800271c1b75",
                  resourceAlias: "name",
                },
              ],
            },
            {
              uuid: "9d65f8b4-3f10-11e4-adec-0800271c1b75",
              display: "ml",
              links: [
                {
                  rel: "self",
                  uri: "http://localhost/openmrs/ws/rest/v1/concept/9d65f54b-3f10-11e4-adec-0800271c1b75/name/9d65f8b4-3f10-11e4-adec-0800271c1b75",
                  resourceAlias: "name",
                },
              ],
            },
          ],
          descriptions: [],
          mappings: [],
          answers: [],
          setMembers: [],
          attributes: [],
          links: [
            {
              rel: "self",
              uri: "http://localhost/openmrs/ws/rest/v1/concept/9d65f54b-3f10-11e4-adec-0800271c1b75",
              resourceAlias: "concept",
            },
            {
              rel: "full",
              uri: "http://localhost/openmrs/ws/rest/v1/concept/9d65f54b-3f10-11e4-adec-0800271c1b75?v=full",
              resourceAlias: "concept",
            },
          ],
          resourceVersion: "2.0",
        },
        numRefills: 0,
        dosingInstructions: '{"instructions":"As directed"}',
        duration: 10,
        durationUnits: {
          uuid: "9d7437a9-3f10-11e4-adec-0800271c1b75",
          display: "Day(s)",
          name: {
            display: "Day(s)",
            uuid: "9d743e1d-3f10-11e4-adec-0800271c1b75",
            name: "Day(s)",
            locale: "en",
            localePreferred: true,
            conceptNameType: "FULLY_SPECIFIED",
            resourceVersion: "1.9",
          },
          set: false,
          version: null,
          retired: false,
          descriptions: [],
          answers: [],
          setMembers: [],
          attributes: [],
          resourceVersion: "2.0",
        },
        route: {
          uuid: "9d6bc13f-3f10-11e4-adec-0800271c1b75",
          display: "Oral",
        },
        brandName: null,
        dispenseAsWritten: false,
        drugNonCoded: null,
        type: "drugorder",
        resourceVersion: "1.10",
      },
      medicationAdministration: {
        uuid: "09eb498f-d118-4462-9d22-a0d5c3a717b4",
        patientUuid: "8f7c45d9-ec2b-411e-82b4-3b19fb2eb60e",
        encounterUuid: null,
        orderUuid: "d2cd8d35-4c40-4656-abb3-469e6200ccfb",
        providers: [
          {
            uuid: "3200793c-b912-44e9-83a9-a1a55754fd3c",
            provider: {
              uuid: "c1c26908-3f10-11e4-adec-0800271c1b75",
              display: "Super Man",
            },
            function: "Performer",
          },
        ],
        notes: [
          {
            uuid: "8843aac8-d50d-447f-9b18-ec692615a847",
            author: {
              uuid: "c1c26908-3f10-11e4-adec-0800271c1b75",
              display: "Super Man",
            },
            recordedTime: 1706513832000,
            text: "Done",
          },
        ],
        status: "Completed",
        statusReason: null,
        drug: null,
        dosingInstructions: null,
        dose: null,
        doseUnits: null,
        route: null,
        site: null,
        administeredDateTime: 1706513828000,
      },
      notes: "",
      administrationSummary: {
        performerName: "Super Man",
        notes: "Done",
        status: "Administered-Late",
      },
    },
  ],
};

export const currentShiftArray = [
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];
