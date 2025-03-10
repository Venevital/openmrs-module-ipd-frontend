import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  fetchAddressMapping,
  fetchPatientProfile,
  getBedInformation,
  getConfigsForPatientContactDetails,
  getGender,
  mapContact,
  fetchPatientProfilePicture,
  mapRelationships,
} from "../utils/PatientHeaderUtils";
import {
  Column,
  Grid,
  Link,
  OverflowMenu,
  OverflowMenuItem,
  Row,
  SkeletonText,
  Tile,
} from "carbon-components-react";
import { FormattedMessage } from "react-intl";
import "../styles/PatientHeader.scss";
import { ChevronDown20, ChevronUp20, HospitalBed16 } from "@carbon/icons-react";
import PatientDetails from "./PatientDetails";
import PatientMovementModal from "./PatientMovementModal";
import { formatDate } from "../../../../utils/DateTimeUtils";
import { IPDContext } from "../../../../context/IPDContext";
import { isUserPrivileged } from "../../../../utils/CommonUtils";
import { PRIVILEGE_CONSTANTS } from "../../../../constants";

export const PatientHeader = (props) => {
  const { patientId, openVisitSummary, setPatientDetailsOpen } = props;
  const { isReadMode, visitSummary, currentUser } = useContext(IPDContext);
  const [showPatientDetails, togglePatientDetails] = useState(false);
  const [patientDetails, updatePatientDetails] = useState({});
  const [isLoading, updateIsLoading] = useState(true);
  const [contacts, setMappedContacts] = useState([]);
  const [relationships, setMappedRelationships] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bedInformation, setBedInformation] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const years = <FormattedMessage id="YEARS" defaultMessage="Years" />;

  const showDetails = (
    <FormattedMessage
      id={"SHOW_PATIENT_DETAILS"}
      xw
      defaultMessage="Show Details"
    />
  );
  const hideDetails = (
    <FormattedMessage id="HIDE_PATIENT_DETAILS" defaultMessage="Hide Details" />
  );
  const patientDetailsHeaders = {
    address: (
      <FormattedMessage id={"PATIENT_ADDRESS"} defaultMessage={"Address"} />
    ),
    contactDetails: (
      <FormattedMessage
        id={"CONTACT_DETAILS_HEADER"}
        defaultMessage={"Contact Details"}
      />
    ),
    relationships: (
      <FormattedMessage
        id={"RELATIONSHIPS_HEADER"}
        defaultMessage={"Relationships"}
      />
    ),
  };
  const visitSummaryMessage = (
    <FormattedMessage id={"VISIT_SUMMARY"} defaultMessage="Visit Summaries" />
  );

  const getContactDetailsConfigs = async () => {
    return await getConfigsForPatientContactDetails();
  };

  const extractPatientInfo = (patientInfo, locationMap) => {
    let locations = [];
    updatePatientDetails({
      fullName: patientInfo?.person?.preferredName.display,
      givenName: patientInfo?.person?.preferredName.givenName,
      familyName: patientInfo?.person?.preferredName.familyName,
      middleName: patientInfo?.person?.preferredName?.middleName,
      age: patientInfo?.person?.age,
      birthDate: formatDate(patientInfo?.person?.birthdate),
      attributes: patientInfo?.person?.attributes,
      gender: getGender(patientInfo?.person?.gender),
      identifier: patientInfo?.identifiers[0]?.identifier,
    });
    locationMap.map((location) => {
      locations = {
        ...locations,
        [location.name]:
          patientInfo.person.preferredAddress &&
          patientInfo.person.preferredAddress[location.addressField],
      };
    });
    updatePatientDetails((patientDetails) => ({
      ...patientDetails,
      locations,
    }));
    updateIsLoading(false);
    return patientInfo?.person?.attributes;
  };

  const extractPatientRelationships = (patientProfile) => {
    return patientProfile?.relationships;
  };

  const toggleDetailsView = () => togglePatientDetails(!showPatientDetails);
  const updatePatientMovementModal = (isOpen) => {
    setIsModalOpen(isOpen);
  };
  useEffect(() => {
    const getPatientInfo = async () => {
      const patientProfile = await fetchPatientProfile(patientId);
      const patientInfo = patientProfile?.patient;
      const patientProfilePicture = await fetchPatientProfilePicture(patientId);
      setProfilePicture(patientProfilePicture);
      const locationMap = await fetchAddressMapping();
      const patientAttributes = extractPatientInfo(patientInfo, locationMap);
      const contactConfigs = await getContactDetailsConfigs();
      const patientRelatives = extractPatientRelationships(patientProfile);
      const bedInformation = await getBedInformation(
        patientId,
        visitSummary.uuid
      );
      setBedInformation(bedInformation[0]);
      setMappedContacts(
        mapContact(patientAttributes, contactConfigs.contactDetails)
      );
      setMappedRelationships(mapRelationships(patientRelatives));
    };
    getPatientInfo();
  }, []);

  return (
    <>
      <Tile className="patient-header">
        {isLoading ? (
          <SkeletonText className="is-loading" data-testid="header-loading" />
        ) : (
          <>
            <Grid>
              <Row className="patient-image-and-details">
                <img
                  className={"patient-image"}
                  src={profilePicture}
                  alt="patient-image"
                />
                <Column>
                  <Row className="header-title-row">
                    <div className="patient-name-and-navigations">
                      <h1 className="patient-name">
                        {patientDetails?.fullName}
                      </h1>
                      <Link onClick={() => openVisitSummary()}>
                        {visitSummaryMessage}
                      </Link>
                    </div>
                    {isUserPrivileged(currentUser, PRIVILEGE_CONSTANTS.ADT) && (
                      <OverflowMenu
                        data-testid="overflow-menu"
                        flipped={true}
                        aria-label="overflow-menu"
                        className="patient-movement-overflow"
                      >
                        <OverflowMenuItem
                          data-testid="overflow-menu-item1"
                          title="item-patient-movement"
                          itemText={
                            <FormattedMessage
                              id="PATIENT_MOVEMENT"
                              defaultMessage="Patient Movement"
                            />
                          }
                          onClick={() =>
                            updatePatientMovementModal(!isModalOpen)
                          }
                          disabled={isReadMode}
                        />
                      </OverflowMenu>
                    )}
                  </Row>
                  <Row>
                    {showPatientDetails ? (
                      <Link
                        kind="tertiary"
                        className="show-more"
                        size="sm"
                        onClick={() => {
                          setPatientDetailsOpen(!showPatientDetails);
                          toggleDetailsView();
                        }}
                      >
                        {hideDetails} <ChevronUp20 />{" "}
                      </Link>
                    ) : (
                      <Link
                        kind="tertiary"
                        className="show-more"
                        size="sm"
                        onClick={() => {
                          setPatientDetailsOpen(!showPatientDetails);
                          toggleDetailsView();
                        }}
                      >
                        {showDetails} <ChevronDown20 />
                      </Link>
                    )}
                    <div className="other-info">
                      <div className="patient-basic-info">
                        <h3 className="patient-info">
                          {patientDetails?.gender}
                        </h3>
                        <h3 className="patient-info">
                          {patientDetails?.age} {years}
                        </h3>
                        <h3 className="patient-info">
                          {patientDetails?.birthDate}
                        </h3>
                        <h3 className="patient-info">
                          {patientDetails?.identifier}
                        </h3>
                        {bedInformation && (
                          <div style={{ display: "flex" }}>
                            <h3 className="patient-info">
                              <HospitalBed16 />
                            </h3>
                            <h3 className="bed-information">
                              {` ${bedInformation?.physicalLocation?.display} ${bedInformation?.bedNumber}`}
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </Row>
                </Column>
              </Row>
            </Grid>
            {showPatientDetails && (
              <PatientDetails
                patientDetails={patientDetails}
                patientDetailsHeaders={patientDetailsHeaders}
                contacts={contacts}
                relationships={relationships}
              />
            )}
          </>
        )}
      </Tile>
      <div>
        {isModalOpen && (
          <div>
            <PatientMovementModal
              updatePatientMovementModal={(isOpen) =>
                updatePatientMovementModal(isOpen)
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

PatientHeader.propTypes = {
  patientId: PropTypes.string.isRequired,
  openVisitSummary: PropTypes.func.isRequired,
  setPatientDetailsOpen: PropTypes.func.isRequired,
};
