/* global embedded_svc */
import {
  SFCHAT_URL_SANDBOX,
  SFCHAT_BUTTON_ID,
  SFCHAT_URL_LIVEAGENT,
  // SFCHAT_URL_OFFLINE_REQUEST,
  SFCHAT_QUEUE_ID,
  SFCHAT_QUEUE_NAME,
  SFCHAT_BASE_LIVE_AGENT_CONTENT_URL,
  SFCHAT_DEPLOYMENT_ID,
  SFCHAT_BASE_LIVE_AGENT_URL,
  SFCHAT_SET_ATTRIBUTE_PATH
} from '@kpmg/env-vars'

// TEST PROD
// const globalConfigSF = {
//   urlSandbox: 'https://kpmg.my.salesforce.com',
//   urlLiveagent: 'https://mon-espace.secure.force.com/liveAgentSetupFlow',
//   queueId: '00D1r000002eSVR',
//   queueName: 'Agents_KPMG',
//   baseLiveAgentContentURL: 'https://c.la1-c2-frf.salesforceliveagent.com/content',
//   deploymentId: '5721r000000H0zj',
//   buttonId: '5731r000000H1g5',
//   baseLiveAgentURL: 'https://d.la1-c2-frf.salesforceliveagent.com/chat',
//   setAttributePath: 'https://kpmg.my.salesforce.com/embeddedservice/5.0/esw.min.js'
// }

const envstrDomain = window.location.hostname

const envurlSandbox = SFCHAT_URL_SANDBOX
const envurlLiveagent = SFCHAT_URL_LIVEAGENT
const envqueueId = SFCHAT_QUEUE_ID
const envqueueName = SFCHAT_QUEUE_NAME
const envbaseLiveAgentContentURL = SFCHAT_BASE_LIVE_AGENT_CONTENT_URL
const envdeploymentId = SFCHAT_DEPLOYMENT_ID
const envbuttonId = SFCHAT_BUTTON_ID
const envbaseLiveAgentURL = SFCHAT_BASE_LIVE_AGENT_URL
const envsetAttributePath = SFCHAT_SET_ATTRIBUTE_PATH

export const salesforceChat = async (
  firstname,
  lastname,
  email,
  companyName,
  accountNumber,
  targetElement,
  urlSandbox = envurlSandbox,
  urlLiveagent = envurlLiveagent,
  queueId = envqueueId,
  queueName = envqueueName,
  baseLiveAgentContentURL = envbaseLiveAgentContentURL,
  deploymentId = envdeploymentId,
  buttonId = envbuttonId,
  strDomain = envstrDomain,
  setAttributePath = envsetAttributePath,
  baseLiveAgentURL = envbaseLiveAgentURL,
  avatarImgPath = 'https://kpmg--c.eu12.content.force.com/sfc/dist/version/renditionDownload?rendition=ORIGINAL_Png&versionId=0681r00000Btoj0&operationContext=DELIVERY&contentId=05T1r00000egP6D&page=0&d=/a/1r0000002FLj/z8oM_.GNiZCtQNpABTL0dHoLVUdI5ij_kJ.j56U4_hk&oid=00D1r000002eSVR&dpt=null&viewId=' // =''//Production : Avatar image
) => {
  const initESW = (gslbBaseURL) => {
    embedded_svc.settings.targetElement = targetElement
    embedded_svc.settings.displayHelpButton = true // Ou faux
    embedded_svc.settings.language = 'fr' // static value
    embedded_svc.settings.onlineLoadingText = 'Chargement' // Static value
    embedded_svc.settings.loadingText = 'Chargement'
    embedded_svc.settings.avatarImgURL = avatarImgPath // Avatar image path

    // Added by Abdelkader Morjan
    embedded_svc.settings.defaultMinimizedText = "Besoin d'aide ?" // static value
    embedded_svc.settings.disabledMinimizedText = 'Conseillers hors ligne' // (static value
    embedded_svc.settings.offlineSupportMinimizedText = "Besoin d'aide ?" // static value
    embedded_svc.settings.storageDomain = strDomain // (definit le domaine de votre deploiement afin de permettre aux visiteurs d'acceder aux sous-domaines pendant la session de chat)

    embedded_svc.settings.extraPrechatFormDetails = [
      { label: 'FirstName', value: firstname, displayToAgent: true },
      { label: 'LastName', value: lastname, displayToAgent: true },
      { label: 'Email', value: email, displayToAgent: true },
      { label: 'Status', value: 'New', displayToAgent: true },
      { label: 'Name', value: companyName, displayToAgent: true },
      { label: 'IBS', value: accountNumber, displayToAgent: true },
      {
        label: 'Subject',
        value: `A définir ${new Date().toLocaleDateString()}`,
        displayToAgent: true
      },
      { label: 'Origin', value: 'Chat', displayToAgent: true }
    ]

    embedded_svc.settings.extraPrechatInfo = [
      {
        entityFieldMaps: [
          {
            doCreate: false,
            doFind: true,
            fieldName: 'FirstName',
            isExactMatch: true,
            label: 'FirstName'
          },
          {
            doCreate: false,
            doFind: true,
            fieldName: 'LastName',
            isExactMatch: true,
            label: 'LastName'
          },
          {
            doCreate: false,
            doFind: true,
            fieldName: 'Email',
            isExactMatch: true,
            label: 'Email'
          }
        ],
        entityName: 'Contact',
        showOnCreate: true,
        linkToEntityField: 'ContactId',
        saveToTranscript: 'ContactId'
      },
      {
        entityFieldMaps: [
          {
            doCreate: false,
            doFind: true,
            fieldName: 'Name',
            isExactMatch: false,
            label: 'Name'
          },
          {
            doCreate: false,
            doFind: true,
            fieldName: 'IBS_Number__c',
            isExactMatch: true,
            label: 'IBS'
          }
        ],
        entityName: 'Account',
        showOnCreate: true,
        linkToEntityField: 'AccountId',
        saveToTranscript: 'AccountId'
      },
      {
        entityFieldMaps: [
          {
            isExactMatch: false,
            fieldName: 'Subject',
            doCreate: true,
            doFind: false,
            label: 'Subject'
          },
          {
            isExactMatch: false,
            fieldName: 'Status',
            doCreate: true,
            doFind: false,
            label: 'Status'
          },
          {
            isExactMatch: false,
            fieldName: 'Origin',
            doCreate: true,
            doFind: false,
            label: 'Origin'
          },
          {
            isExactMatch: false,
            fieldName: 'SuppliedName',
            doCreate: true,
            doFind: false,
            label: 'LastName'
          },
          {
            isExactMatch: false,
            fieldName: 'SuppliedPrenom__c',
            doCreate: true,
            doFind: false,
            label: 'FirstName'
          },
          {
            isExactMatch: false,
            fieldName: 'SuppliedEmail',
            doCreate: true,
            doFind: false,
            label: 'Email'
          },
          {
            isExactMatch: false,
            fieldName: 'SuppliedCompany',
            doCreate: true,
            doFind: false,
            label: 'Name'
          }
        ],
        entityName: 'Case',
        showOnCreate: true,
        saveToTranscript: 'CaseId',
        linkToEntityField: 'CaseId'
      }
    ]

    embedded_svc.settings.enabledFeatures = ['LiveAgent']
    embedded_svc.settings.entryFeature = 'LiveAgent'
    embedded_svc.init(
      urlSandbox, //'https://kpmgfrance--devdce6.my.salesforce.com',
      urlLiveagent, //'https://devdce6-escchat.cs109.force.com/liveAgentSetupFlow',
      gslbBaseURL,
      queueId, //'00D0Q0000001Q9F',
      queueName,
      {
        baseLiveAgentContentURL: baseLiveAgentContentURL, //'https://c.la1-c1cs-cdg.salesforceliveagent.com/content',
        deploymentId: deploymentId, //5723Y0000000JuM',
        buttonId: buttonId, //'5733Y0000000JiF',
        baseLiveAgentURL: baseLiveAgentURL, //'https://d.la1-c1cs-cdg.salesforceliveagent.com/chat',
        eswLiveAgentDevName: queueName, //'ESC',
        isOfflineSupportEnabled: true
      }
    )
  }

  if (!window.embedded_svc) {
    const s = document.createElement('script')
    s.setAttribute('src', setAttributePath)
    s.onload = function () {
      initESW(null)
    }
    document.body.appendChild(s)
  } else {
    initESW('https://service.force.com')
  }

  const purify = document.createElement('script')
  purify.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/1.0.10/purify.js')
  document.body.appendChild(purify)
}
