import React from "react";
import Link from "react-router-dom/Link";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle";

class ProductSection extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section} style={{ textAlign: "left" }}>
        <GridContainer justify="center">
          <GridItem xs={12}>
            <h2 className={classes.title} style={{ textAlign: "center" }}>
              Welcome to our Privacy Policy
            </h2>
            <h3>
                Your privacy is critically important to us.
            </h3>
              Bezop Marketplace is located at:
            <br />
            <address>
                Bezop Marketplace
              <br />
                Shop Marketplace
              <br />
                12432323233
            </address>
            <h5>
                It is Bezop Marketplace’s policy to respect your privacy regarding any information
                we may collect while operating our website. This Privacy Policy applies to
              {" "}
              <Link to="/">
                bezop.com
              </Link>
              {" "}
              {`(hereinafter, "us", "we", or "bezop.com"). We respect your privacy and are committed to
                protecting personally identifiable information you may provide us through the Website.
                We have adopted this privacy policy ("Privacy Policy") to explain what information may
                be collected on our Website, how we use this information, and under what circumstances
                we may disclose the information to third parties. This Privacy Policy applies only to
                information we collect through the Website and does not apply to our collection of
                information from other sources.`}
            </h5>
            <h5>
              This Privacy Policy, together with the Terms and conditions posted on our Website,
              set forth the general rules and policies governing your use of our Website.
              Depending on your activities when visiting our Website, you may be required to agree
              to additional terms and conditions.
            </h5>

            <h2>
              Website Visitors
            </h2>
            <h5>
              Like most website operators, Bezop Marketplace collects non-personally-identifying
              information of the sort that web browsers and servers typically make available,
              such as the browser type, language preference, referring site, and the date and time
              of each visitor request. Bezop Marketplace’s purpose in collecting non-personally
              identifying information is to better understand how Bezop Marketplace’s visitors use
              its website. From time to time, Bezop Marketplace may release
              non-personally-identifying information in the aggregate, e.g.,
              by publishing a report on trends in the usage of its website.
            </h5>
            <h5>
Bezop Marketplace also collects potentially personally-identifying information like Internet Protocol (IP) addresses for logged in users and for users leaving comments on http://bezop.com blog posts. Bezop Marketplace only discloses logged in user and commenter IP addresses under the same circumstances that it uses and discloses personally-identifying information as described below.
            </h5>

            <h2>
Gathering of Personally-Identifying Information
            </h2>
            <h5>
Certain visitors to Bezop Marketplace’s websites choose to interact with Bezop Marketplace in ways that require Bezop Marketplace to gather personally-identifying information. The amount and type of information that Bezop Marketplace gathers depends on the nature of the interaction. For example, we ask visitors who sign up for a blog at http://bezop.com to provide a username and email address.
            </h5>

            <h2>
Security
            </h2>
            <h5>
The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </h5>

            <h2>
Advertisements
            </h2>
            <h5>
Ads appearing on our website may be delivered to users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This Privacy Policy covers the use of cookies by Bezop Marketplace and does not cover the use of cookies by any advertisers.
            </h5>


            <h2>
Links To External Sites
            </h2>
            <h5>
Our Service may contain links to external sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms and conditions of every site you visit.
            </h5>
            <h5>
We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites, products or services.
            </h5>

            <h2>
Bezop.com uses Google AdWords for remarketing
            </h2>
            <h5>
Bezop.com uses the remarketing services to advertise on third party websites (including Google) to previous visitors to our site. It could mean that we advertise to previous visitors who haven’t completed a task on our site, for example using the contact form to make an enquiry. This could be in the form of an advertisement on the Google search results page, or a site in the Google Display Network. Third-party vendors, including Google, use cookies to serve ads based on someone’s past visits. Of course, any data collected will be used in accordance with our own privacy policy and Google’s privacy policy.
            </h5>
            <h5>
You can set preferences for how Google advertises to you using the Google Ad Preferences page, and if you want to you can opt out of interest-based advertising entirely by cookie settings or permanently using a browser plugin.
            </h5>

            <h2>
Protection of Certain Personally-Identifying Information
            </h2>
            <h5>
Bezop Marketplace discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on Bezop Marketplace’s behalf or to provide services available at Bezop Marketplace’s website, and (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; by using Bezop Marketplace’s website, you consent to the transfer of such information to them. Bezop Marketplace will not rent or sell potentially personally-identifying and personally-identifying information to anyone. Other than to its employees, contractors and affiliated organizations, as described above, Bezop Marketplace discloses potentially personally-identifying and personally-identifying information only in response to a subpoena, court order or other governmental request, or when Bezop Marketplace believes in good faith that disclosure is reasonably necessary to protect the property or rights of Bezop Marketplace, third parties or the public at large.
            </h5>
            <h5>
If you are a registered user of http://bezop.com and have supplied your email address, Bezop Marketplace may occasionally send you an email to tell you about new features, solicit your feedback, or just keep you up to date with what’s going on with Bezop Marketplace and our products. We primarily use our blog to communicate this type of information, so we expect to keep this type of email to a minimum. If you send us a request (for example via a support email or via one of our feedback mechanisms), we reserve the right to publish it in order to help us clarify or respond to your request or to help us support other users. Bezop Marketplace takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.
            </h5>

            <h2>
Aggregated Statistics
            </h2>
            <h5>
Bezop Marketplace may collect statistics about the behavior of visitors to its website. Bezop Marketplace may display this information publicly or provide it to others. However, Bezop Marketplace does not disclose your personally-identifying information.
            </h5>

            <h2>
Affiliate Disclosure
            </h2>
            <h5>
This site uses affiliate links and does earn a commission from certain links. This does not affect your purchases or the price you may pay.
            </h5>

            <h2>
Cookies
            </h2>
            <h5>
To enrich and perfect your online experience, Bezop Marketplace uses "Cookies", similar technologies and services provided by others to display personalized content, appropriate advertising and store your preferences on your computer.
            </h5>
            <h5>
A cookie is a string of information that a website stores on a visitor’s computer, and that the visitor’s browser provides to the website each time the visitor returns. Bezop Marketplace uses cookies to help Bezop Marketplace identify and track visitors, their usage of http://bezop.com, and their website access preferences. Bezop Marketplace visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using Bezop Marketplace’s websites, with the drawback that certain features of Bezop Marketplace’s websites may not function properly without the aid of cookies.
            </h5>
            <h5>
By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to Bezop Marketplace's use of cookies.
            </h5>

            <h2>
E-commerce
            </h2>
            <h5>
Those who engage in transactions with Bezop Marketplace – by purchasing Bezop Marketplace's services or products, are asked to provide additional information, including as necessary the personal and financial information required to process those transactions. In each case, Bezop Marketplace collects such information only insofar as is necessary or appropriate to fulfill the purpose of the visitor’s interaction with Bezop Marketplace. Bezop Marketplace does not disclose personally-identifying information other than as described below. And visitors can always refuse to supply personally-identifying information, with the caveat that it may prevent them from engaging in certain website-related activities.
            </h5>

            <h2>
Business Transfers
            </h2>
            <h5>
If Bezop Marketplace, or substantially all of its assets, were acquired, or in the unlikely event that Bezop Marketplace goes out of business or enters bankruptcy, user information would be one of the assets that is transferred or acquired by a third party. You acknowledge that such transfers may occur, and that any acquirer of Bezop Marketplace may continue to use your personal information as set forth in this policy.
            </h5>

            <h2>
Privacy Policy Changes
            </h2>
            <h5>
Although most changes are likely to be minor, Bezop Marketplace may change its Privacy Policy from time to time, and in Bezop Marketplace’s sole discretion. Bezop Marketplace encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.
            </h5>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
