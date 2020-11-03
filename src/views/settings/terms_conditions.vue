<template>
  <DefaultLayout>
    <v-layout flex justify-space-between align-center class="v-page-title">
      <div class="page-title">
        <h2>Terms & Conditions</h2>
      </div>
      <div>
        <v-btn icon color="secondary">
          <i class="fa fa-search"></i>
        </v-btn>
        <v-btn icon><i class="fa fa-plus"></i></v-btn>
      </div>
    </v-layout>
    <v-layout row wrap class="paragraph">
      <p>
        Terms and Conditions agreements act as a legal contract between you (the
        company) who has the website or mobile app and the user who access your
        website and mobile app. Having a Terms and Conditions agreement is
        completely optional. No laws require you to have one. Not even the
        super-strict and wide-reaching General Data Protection Regulation
        (GDPR). It's up to you to set the rules and guidelines that the user
        must agree to. You can think of your Terms and Conditions agreement as
        the legal agreement where you maintain your rights to exclude users from
        your app in the event that they abuse your app, where you maintain your
        legal rights against potential app abusers, and so on. Terms and
        Conditions are also known as Terms of Service or Terms of Use.
        <br />
        <br />A Terms and Conditions agreement is not legally required. However,
        having one comes with a number of important benefits for both you and
        your users/customers. The benefits include increasing your control over
        your business/platform, while helping your users understand your rules,
        requirements and restrictions.
      </p>
      <p>
        1) Websites
        <br />2) WordPress blogs or blogs on any kind of platform Joomla!,
        Drupal etc. <br />3) E-commerce shops <br />4) Mobile apps: iOS, Android
        or Windows phone <br />5) Facebook apps <br />6) Desktop apps <br />7)
        SaaS apps
        <br />

        <br />
        <br />If your website or mobile app allows users to create content and
        make that content public to other users, a Content section will inform
        users that they own the rights to the content they have created. The
        "Content" clause usually mentions that users must give you (the website
        or mobile app developer) a license so that you can share this content on
        your website/mobile app and to make it available to other users.
      </p>
    </v-layout>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/default";
export default {
  name: "TermsConditions",
  components: {
    DefaultLayout
  },
  data: () => {
    return {};
  }
};
</script>
