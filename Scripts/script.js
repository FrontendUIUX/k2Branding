document.addEventListener("DOMContentLoaded", function () {
    const urlPath = window.location.pathname;

    // Skip sidebar for specific page
    if (urlPath === "/Public/Public/Form.aspx") return;

    // Ensure jQuery is loaded
    if (typeof jQuery === "undefined") {
        console.error("jQuery is required for this script.");
        return;
    }

    // Detect Arabic
    const isArabic = window.location.href.includes("PublicAR");

    // =============================
    // TRANSLATIONS
    // =============================
    const translations = {
        en: {
            menu: "MENU",
            others: "OTHERS",
            help: "Help",
            dashboard: "Dashboard",
            submitted: "Submitted Requests",
            pending: "Pending Tasks",
            accounts: "My Accounts",
            profileTitle: "Corporate / Government",
            profileDesc: "A profile is used to manage corporate or government accounts.",
            createProfile: "Create Profile"
        },
        ar: {
            menu: "القائمة",
            others: "أخرى",
            help: "مساعدة",
            dashboard: "لوحة القيادة",
            submitted: "الطلبات المقدمة",
            pending: "المهام المعلقة",
            accounts: "حساباتي",
            profileTitle: "الملف الشخصي للشركات / الحكومة",
            profileDesc: "يُستخدم الملف الشخصي لإدارة حسابات الشركات أو الحكومة.",
            createProfile: "إنشاء ملف شخصي"
        }
    };

    const t = isArabic ? translations.ar : translations.en;

    // =============================
    // USER PERMISSIONS (Example)
    // =============================
    // This should come from backend / session / API.
    // Example: Replace with actual logic
    const userPermissions = [
        "dashboard:view",
        "submitted:view",
        // "pending:view",   // User has no access
        "accounts:view"
    ];

    function hasPermission(key) {
        return userPermissions.includes(key);
    }

    // =============================
    // MENU ITEMS
    // =============================
    const baseUrl = isArabic
        ? "https://ns.namaservices.om/PublicAR/Runtime/Form/"
        : "https://ns.namaservices.om/Public/Runtime/Form/";

    const menuItems = [
        { text: t.dashboard, url: baseUrl + "LCTS.EservicesHub.Form/", icon: "Dashboard-active.svg", permission: "dashboard:view" },
        { text: t.submitted, url: baseUrl + "External.SubmittedRequests.Form/", icon: "Document.svg", permission: "submitted:view" },
        { text: t.pending, url: baseUrl + "External.PendingTasks.Form/", icon: "pending.svg", permission: "pending:view" },
        { text: t.accounts, url: baseUrl + "External.UserAccounts.Form/", icon: "account 1.svg", permission: "accounts:view" }
    ];

    // =============================
    // CREATE ELEMENT HELPERS
    // =============================
    function createMenuItem(item) {
        const link = $('<a>')
            .attr('href', item.url)
            .addClass('sidebar-link');

        if (window.location.href.includes(item.url)) {
            link.addClass('active');
        }

        const icon = $('<img>')
            .attr('src', `https://ns.namaservices.om/Style/logos/${item.icon}`)
            .attr('alt', item.text)
            .addClass('sidebar-icon');

        link.append(icon).append($('<span>').text(item.text));
        return link;
    }

    function createSection(title) {
        return $(`<div class="sidebar-section">${title}</div>`);
    }

    // =============================
    // SIDEBAR BUILD
    // =============================
    const sidebar = $('<div id="sidebar" class="sidebar"></div>');

    // Logo
    const logoContainer = $('<div class="sidebar-logo-container"></div>');
    const logoLink = $('<a></a>').attr('href', baseUrl + "LCTS.EservicesHub.Form/");
    const logoImage = $('<img>')
        .attr('src', 'https://ns.namaservices.om/Style/logo.png')
        .attr('alt', 'Company Logo')
        .addClass('sidebar-logo');
    logoLink.append(logoImage);
    logoContainer.append(logoLink);
    sidebar.append(logoContainer);

    // Menu Section
    sidebar.append(createSection(t.menu));
    menuItems.forEach(item => {
        if (hasPermission(item.permission)) {
            sidebar.append(createMenuItem(item));
        }
    });

    // Others Section
    sidebar.append(createSection(t.others));
    const helpLink = $('<a href="#" class="sidebar-link"></a>');
    const helpIcon = $('<img src="https://ns.namaservices.om/Style/logos/help.svg" class="sidebar-icon" alt="Help">');
    helpLink.append(helpIcon).append($('<span>').text(t.help));
    sidebar.append(helpLink);

    // Append Sidebar
    $('body').append(sidebar);
});
