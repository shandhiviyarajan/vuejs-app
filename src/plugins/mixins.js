import moment from "moment";
export const mixins = {
  data() {
    return {
      DEFAULT_DATE_FORMAT: "1900-01-01 00:00:00",
      ZE_DATE_FORMAT: "",
      NOT_AVAILABLE: "N/A",
    };
  },
  filters: {},
  methods: {
    validateEmail: (email) => {
      var email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (email != undefined || email != "" || email != null) {
        return email_regex.test(email);
      } else {
        return this.NOT_AVAILABLE;
      }
    },

    formatDate: function(date) {
      if (date != undefined || date != "" || date != null) {
        return moment(date).format("DD-MMM-YYYY");
      } else {
        return this.NOT_AVAILABLE;
      }
    },
    formatTime: function(time) {
      if (time) {
        return moment(time, "HH:mm:ss").format("hh:mm A");
      } else {
        return this.DEFAULT_RETURN_STRING;
      }
    },
  },
};
