export const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
};

export const KhmerCurrency = (value) => {
    return new Intl.NumberFormat("km-KH", {
        style: "currency",
        currency: "KHR", // Correct ISO 4217 currency code for Cambodian Riel
    }).format(value);
};

// Format number
export const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US").format(value);
};

export const formatDate = (value) => {
    // Check if the value is a Firestore Timestamp
    if (value && typeof value.toDate === 'function') {
        value = value.toDate();
    }
    // Ensure the value is a Date object
    const date = new Date(value);
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
        // hour12: true, // Use 12-hour time format
    });
};

export const formatDateTime = (value) => {
    return new Date(value).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const formatNumberWithCommas = (value) => {
    return new Intl.NumberFormat("en-US").format(value);
};
// formart phone number max 10 digit not allow for - + space    
// helpers.js
export const formatPhoneNumber = (value) => {
    return value.replace(/[^\d]/g, "").slice(0, 10);
};
