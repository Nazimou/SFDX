
var initESW = function(gslbBaseURL) {
    embedded_svc.settings.displayHelpButton = true; //Or false
    embedded_svc.settings.language = ''; //For example, enter 'en' or 'en-US'

    //embedded_svc.settings.defaultMinimizedText = '...'; //(Defaults to Chat with an Expert)
    //embedded_svc.settings.disabledMinimizedText = '...'; //(Defaults to Agent Offline)

    //embedded_svc.settings.loadingText = ''; //(Defaults to Loading)
    //embedded_svc.settings.storageDomain = 'yourdomain.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)

    // Settings for Chat
    //embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
        // Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
        // Returns a valid button ID.
    //};
    //embedded_svc.settings.prepopulatedPrechatFields = {}; //Sets the auto-population of pre-chat form fields
    //embedded_svc.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
    //embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)

    embedded_svc.settings.enabledFeatures = ['LiveAgent'];
    embedded_svc.settings.entryFeature = 'LiveAgent';
    embedded_svc.settings.extraPrechatFormDetails = [
        { label: 'FirstName', value: 'case test kh 17/02/2023', displayToAgent: true },
        { label: 'LastName', value: 'case test kh 17/02/2023', displayToAgent: true },
        { label: 'Email', value: 'testkh170220233@gemail.com', displayToAgent: true },
        { label: 'Status', value: 'New', displayToAgent: true },
        { label: 'Case_Available', value: 'true', displayToAgent: true },
        { label: 'Name', value: 'case test kh 17/02/2023', displayToAgent: true },
        { label: 'IBS', value: '17022023', displayToAgent: true },
        {
            label: 'Subject',
            value: 'test kh 17/02/2023 V1',
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
                    fieldName: 'SuppliedEmail',
                    doCreate: false,
                    doFind: true,
                    label: 'Email'
                },
                {
                    isExactMatch: false,
                    fieldName: 'Tech_Case_Available__c',
                    doCreate: false,
                    doFind: true,
                    label: 'Case_Available'
                },
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
    embedded_svc.init(
        'https://kpmgfrance--preprod.sandbox.my.salesforce.com',
        'https://kpmgfrance--preprod.sandbox.my.salesforce-sites.com/liveAgentSetupFlow',
        gslbBaseURL,
        '00D3N000000H6BB',
        'MyPulse_Chat_Patch',
        {
            baseLiveAgentContentURL: 'https://c.la2-c1cs-cdg.salesforceliveagent.com/content',
            deploymentId: '5723Y0000000JuM',
            buttonId: '5733Y0000000JiK',
            baseLiveAgentURL: 'https://d.la2-c1cs-cdg.salesforceliveagent.com/chat',
            eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I3N0000004D57UAE_187bdfa64e1',
            isOfflineSupportEnabled: true
        }
    );
};

if (!window.embedded_svc) {
    var s = document.createElement('script');
    s.setAttribute('src', 'https://kpmgfrance--preprod.sandbox.my.salesforce.com/embeddedservice/5.0/esw.min.js');
    s.onload = function() {
        initESW(null);
    };
    document.body.appendChild(s);
} else {
    initESW('https://service.force.com');
}
