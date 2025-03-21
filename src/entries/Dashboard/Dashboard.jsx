import React, { useState, useRef, Suspense, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  Header,
  HeaderMenuButton,
  Link,
  Loading,
  SideNav,
  SideNavItems,
  SideNavLink,
} from "carbon-components-react";
import { Application24, Home24, UserActivity24 } from "@carbon/icons-react";
import { componentMapping } from "./componentMapping";
import "./Dashboard.scss";
import PropTypes from "prop-types";
import { I18nProvider } from "../../features/i18n/I18nProvider";
import {
  fetchFormData,
  getAllFormsInfo,
  getAppLandingPageUrl,
  getDashboardConfig,
  getPatientDashboardUrl,
} from "../../utils/CommonUtils";
import { PatientHeader } from "../../features/DisplayControls/PatientHeader/components/PatientHeader";
import RefreshDisplayControl from "../../context/RefreshDisplayControl";
import { SliderContext } from "../../context/SliderContext";
import { IPDContext } from "../../context/IPDContext";
import { AllMedicationsContextProvider } from "../../context/AllMedications";
import { FormattedMessage } from "react-intl";
import { homePageUrl, RESOLUTION_VALUE, IPD_PAGE_TITLE } from "../../constants";
import { ProviderActions } from "../../components/ProvideActions/ProviderActions";

export default function Dashboard(props) {
  const { hostData, hostApi } = props;
  const {
    patient,
    visitUuid,
    location,
    provider,
    isReadMode = false,
    visitSummary,
    source,
    currentUser,
  } = hostData;
  const [sliderContentModified, setSliderContentModified] = useState({
    treatments: false,
    nursingTasks: false,
    emergencyTasks: false,
  });
  const [isSliderOpen, updateSliderOpen] = useState({
    treatments: false,
    nursingTasks: false,
    emergencyTasks: false,
  });
  const [sections, setSections] = useState([]);
  const [isSideNavExpanded, updateSideNav] = useState(false);
  const [selectedTab, updateSelectedTab] = useState(null);
  const refs = useRef([]);
  const [dashboardConfig, setDashboardConfig] = useState({});
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isShowPatientDetailsOpen, setPatientDetailsOpen] = useState(false);
  const [allFormsSummary, setAllFormsSummary] = useState([]);
  const [allFormsFilledInCurrentVisit, setAllFormsFilledInCurrentVisit] =
    useState([]);
  const [isAllFormSummaryLoading, setIsAllFormSummaryLoading] = useState(false);
  const [
    isAllFormsFilledInCurrentVisitLoading,
    setIsAllFormsFilledInCurrentVisitLoading,
  ] = useState(false);
  const noConfigDataMessage = (
    <FormattedMessage
      id="NO_CONFIG_MESSAGE"
      defaultMessage={"Please specify IPD Dashboard configurations"}
    />
  );

  const fetchConfig = async () => {
    const configData = await getDashboardConfig();
    const config = configData.data || {};
    setDashboardConfig(config);
    setIsConfigLoaded(true);
    const { sections = [] } = config;
    const updatedSections = sections
      .filter((sec) => componentMapping[sec.componentKey])
      .sort((a, b) => a.displayOrder - b.displayOrder);
    updateSelectedTab(updatedSections[0].componentKey);
    setSections(updatedSections);
  };

  const fetchAllForms = async () => {
    const allFormsInfo = await getAllFormsInfo();
    if (allFormsInfo.status === 200) {
      setAllFormsSummary(allFormsInfo.data);
      setIsAllFormSummaryLoading(false);
    }
  };
  const fetchAllFormsFilledInCurrentVisit = async () => {
    const response = await fetchFormData(patient?.uuid, visitUuid);
    if (response.status === 200) {
      setAllFormsFilledInCurrentVisit(response.data);
      setIsAllFormsFilledInCurrentVisitLoading(false);
    }
  };

  useEffect(() => {
    setIsAllFormSummaryLoading(true);
    setIsAllFormsFilledInCurrentVisitLoading(true);
    fetchConfig();
    fetchAllForms();
    fetchAllFormsFilledInCurrentVisit();
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = IPD_PAGE_TITLE;
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const onClickSideNavExpand = () => {
    updateSideNav(!isSideNavExpanded);
  };

  const scrollToSection = (key) => {
    updateSelectedTab(key);
    window.scrollTo({
      top: refs.current[key].offsetTop - (isShowPatientDetailsOpen ? 284 : 102),
      behavior: "smooth",
    });
  };

  const checkSliderStatus = () => {
    return Object.values(isSliderOpen).includes(true);
  };

  const handleVisitSummaryNavigation = () => {
    hostApi?.navigation?.visitSummary?.();
  };

  const refreshDisplayControl = (componentKeyArray) => {
    const updatedSections = sections.map((el) => {
      return componentKeyArray.includes(el.componentKey)
        ? { ...el, refreshKey: Math.random() }
        : el;
    });
    setSections(updatedSections);
  };

  const handleClickOutside = (event) => {
    const navBar = document.getElementById("Side-Nav");
    if (navBar && !navBar.contains(event.target)) {
      updateSideNav(false);
    }
  };

  const handleAuditEvent = (eventType) => {
    var messageParams = {
      visitUuid: hostData.visitSummary.uuid,
      visitType: hostData.visitSummary.visitType,
    };
    hostApi.handleAuditEvent(
      patient.uuid,
      eventType,
      messageParams,
      "MODULE_LABEL_CLINICAL_KEY"
    );
  };

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  return (
    <>
      {!isConfigLoaded ? (
        <Loading withOverlay={true} />
      ) : isConfigLoaded && dashboardConfig?.sections?.length === 0 ? (
        <div style={{ paddingLeft: "10px" }}>{noConfigDataMessage}</div>
      ) : (
        <SliderContext.Provider
          value={{
            isSliderOpen,
            updateSliderOpen,
            sliderContentModified,
            setSliderContentModified,
            provider: hostData.provider,
            visitUuid: hostData.visitUuid,
            visitSummary: hostData.visitSummary,
          }}
        >
          <IPDContext.Provider
            value={{
              patient,
              visit: visitUuid,
              location,
              provider,
              config: dashboardConfig,
              isReadMode,
              handleAuditEvent,
              visitSummary,
              allFormsSummary,
              allFormsFilledInCurrentVisit,
              isAllFormSummaryLoading,
              isAllFormsFilledInCurrentVisitLoading,
              currentUser,
            }}
          >
            <main className="ipd-page">
              <Header
                className="border-bottom-0 header-bg-color ipd-header"
                aria-label="IBM Platform Name"
              >
                <div className={"header-nav"}>
                  <HeaderMenuButton
                    aria-label="Open menu"
                    className="header-nav-toggle-btn"
                    style={
                      windowWidth < RESOLUTION_VALUE && checkSliderStatus()
                        ? { display: "none" }
                        : {}
                    }
                    onClick={onClickSideNavExpand}
                    isActive={isSideNavExpanded}
                  />
                  <Link href={homePageUrl} renderIcon={Home24} />
                  <Link
                    href={getAppLandingPageUrl(source)}
                    renderIcon={Application24}
                  />
                  <Link
                    href={getPatientDashboardUrl(patient?.uuid)}
                    renderIcon={UserActivity24}
                  />
                </div>
                <I18nProvider>
                  <SideNav
                    id="Side-Nav"
                    aria-label="Side navigation"
                    className="navbar-border"
                    expanded={isSideNavExpanded}
                  >
                    <SideNavItems>
                      {sections?.map((el) => (
                        <SideNavLink
                          className="cursor-pointer"
                          isActive={el.componentKey === selectedTab}
                          key={el.componentKey}
                          onClick={() => scrollToSection(el.componentKey)}
                        >
                          <FormattedMessage
                            id={`NAVBAR_${el.componentKey}`}
                            defaultMessage={el.title}
                          />
                        </SideNavLink>
                      ))}
                    </SideNavItems>
                  </SideNav>
                </I18nProvider>
                <ProviderActions onLogOut={hostApi.onLogOut} />
              </Header>

              <section
                className={checkSliderStatus() ? "main-with-slider" : "main"}
              >
                <div className={"patient-header-navigation"}>
                  <I18nProvider>
                    <PatientHeader
                      patientId={patient?.uuid}
                      openVisitSummary={handleVisitSummaryNavigation}
                      setPatientDetailsOpen={setPatientDetailsOpen}
                    />
                  </I18nProvider>
                </div>
                <Accordion className={"accordion"}>
                  <AllMedicationsContextProvider>
                    {sections?.map((el) => {
                      const DisplayControl = componentMapping[el.componentKey];
                      return (
                        <section
                          key={el.componentKey}
                          ref={(ref) => (refs.current[el.componentKey] = ref)}
                          style={{ marginBottom: "40px" }}
                        >
                          <Suspense fallback={<p>Loading...</p>}>
                            <I18nProvider>
                              <AccordionItem
                                open
                                title={
                                  <FormattedMessage
                                    id={`NAVBAR_${el.componentKey}`}
                                    defaultMessage={el.title}
                                  />
                                }
                              >
                                <RefreshDisplayControl.Provider
                                  value={refreshDisplayControl}
                                >
                                  <DisplayControl
                                    key={el.refreshKey}
                                    patientId={patient?.uuid}
                                    config={el.config}
                                  />
                                </RefreshDisplayControl.Provider>
                              </AccordionItem>
                            </I18nProvider>
                          </Suspense>
                        </section>
                      );
                    })}
                  </AllMedicationsContextProvider>
                </Accordion>
              </section>
            </main>
          </IPDContext.Provider>
        </SliderContext.Provider>
      )}
    </>
  );
}
Dashboard.propTypes = {
  hostData: PropTypes.object.isRequired,
  hostApi: PropTypes.object.isRequired,
};
