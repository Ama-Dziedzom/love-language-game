import axios from "axios";

const TRACK_URL = "https://stanbic-vals-backend.interactivedigital.com.gh/api/track";

export const trackEvent = async (event, payload = {}) => {
  try {
    await axios.post(TRACK_URL, {
      event,
      url: window.location.href,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      ...payload,
    });
  } catch (error) {
    console.error("Tracking failed", error);
  }
};
