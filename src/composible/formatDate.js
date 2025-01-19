import moment from "moment-timezone";

export const formatDate = (timestamp, timezone = "Asia/Phnom_Penh") => {
    if (!timestamp || !timestamp.seconds) {
        return "Invalid Date";
    }

    // Convert Firestore Timestamp to JavaScript Date
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);

    // Format as "8 Dec 2024"
    return moment.tz(date, timezone).format("D MMM YYYY");
};