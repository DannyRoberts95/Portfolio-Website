// Fire a gtag event to be recorded in GA

// gtag('event', <action>, {
//   'event_category': <category>,
//   'event_label': <label>,
//   'value': <value>
// });

// DEFAULT ACTIONS -> https://developers.google.com/analytics/devguides/collection/gtagjs/events#default_google_analytics_events

export default function fireGtag(action, details) {
  if (window.gtag && action && details) {
    window.gtag.event(action, details)
  } else {
    //event fire failure
  }
}
