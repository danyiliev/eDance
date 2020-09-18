import React from 'react';
import {stylesApp} from '../../styles/app.style';
import {ScrollView, Text, View} from 'react-native';
import {styles} from './styles';

export default class Terms extends React.Component {
  static NAV_NAME = 'terms';

  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: 'Terms of Service',
    });
  }

  render() {
    return (
      <View style={stylesApp.viewContainer}>
        <ScrollView>
          <View style={styles.viewContainer}>
            <Text style={styles.txtTitle}>EdanceSport LLC Terms of Service</Text>

            <Text style={styles.txtSubTitle}>Terms of Use</Text>
            <Text style={styles.txtMain}>
              Our website, www.EDANCESPORT.com (the “Site”), is intended to provide information about and
              access to the edancesport app products and services, including available edancesport LLC.
              applications (“edancesport” Apps”). It allows you to interact with us and others and provides
              you the opportunity to contact us directly. While we want you to enjoy the experience of
              visiting our Site, we also want you to understand the terms to which you agree when visiting the
              Site. References to “we,” “our,” “us” or “edancesport LLC.” herein refer to edancesport app., a
              Delaware LLC corporation, and our service providers and designees as deemed appropriate by us.
            </Text>

            <Text style={styles.txtSubTitle}>Compliance with Terms</Text>
            <Text style={styles.txtMain}>
              Product and Service Purchases By accessing this Site, using the edancesport App, proceeding with
              the edancesport app. registration process or utilizing any part of the Service, you are agreeing
              to these Terms of Use, our Privacy Policy and any other legal notices, terms and policies on the
              Site (together referred to as “Terms”), all of which are expressly incorporated herein by this
              reference. If you are entering into this agreement on behalf of a company or other legal entity,
              you represent that you have the authority to bind such entity to the Terms, in which case the
              terms “you” or “your” shall refer to such entity. You agree to use the Service only in
              accordance with the Terms, whether you are a “Visitor” (which means that you simply browse the
              Site), a “Member” (which means you have registered with us for the Service), or a “Merchant”
              (which means you have registered with us for the Service and have also signed a Merchant
              Subscription Agreement). The term “User” means a “Visitor”, a “Member” or a “Merchant.” Please
              read and save all of the Terms. If you do not agree with the Terms, do not use this Site, any
              edancesport App, the Service or any of their respective features. If you register to become a
              Member or a Merchant you may be required to indicate your acceptance to these Terms during the
              registration process.
            </Text>

            <Text style={styles.txtSubTitle}>Amendment</Text>
            <Text style={styles.txtMain}>
              We may amend or terminate any Terms at any time and such amendment or termination will be
              effective at the time we post the revised Terms on the Site. Each time you use the Service you
              should visit and review the then current Terms that apply to your transactions and use of the
              Service. Your continued use of the Service after we have posted revised Terms signifies your
              acceptance of such revised Terms. If you are dissatisfied with the Service, its content or any
              Terms (including as modified), you agree that your sole and exclusive remedy is to discontinue
              using the Service. The Terms are the entire agreement between you and edancesport LLC. with
              respect to your use of the Service.
            </Text>

            <Text style={styles.txtSubTitle}>Sharing</Text>
            <Text style={styles.txtMain}>
              For some features, the Service may allow you to share your private information with other Users
              and to publish this information on the Internet. You will need to take specific action for this
              to occur, and the Service will make a reasonable attempt to explain the consequences of your
              actions. EdanceSport LLC. disclaims all liability and responsibility for any consequences
              (including, but not limited to, unforeseen consequences) of sharing private information, or for
              you accidentally sharing information that you intended to keep private. You may have the right
              to “opt-in” for push notifications from Merchants. If you choose to opt-in, Edancesport LLC.
              will deliver push notifications to your mobile device from such Merchants. Edancesport LLC. is
              not responsible for the content of such push notifications.
            </Text>

            <Text style={styles.txtSubTitle}>Eligibility</Text>
            <Text style={styles.txtMain}>
              Use of the Service and its features and registration to be a Member (“Membership”) is void where
              prohibited. By using the Service and its features, you represent and warrant that (a) you are
              not a minor and may otherwise enter into and form binding contracts under applicable law; (b)
              all registration information you submit is truthful and accurate; (c) you will maintain the
              accuracy of such information; and (d) your use of the Service and its features does not violate
              any applicable law or regulation.
            </Text>

            <Text style={styles.txtSubTitle}>Term</Text>
            <Text style={styles.txtMain}>
              The Terms, as we may revise them from time to time, shall remain in full force and effect while
              you use the app Service features or are a Member. You may terminate your Membership at any time,
              for any reason, by providing written notice to us. We may terminate your Membership at any time,
              for any or no reason, with or without prior notice or explanation, and without liability. Even
              after Membership is terminated, the Terms will remain in effect and you will remain bound by
              them except that your right to use the Service as a Member will terminate.
            </Text>

            <Text style={styles.txtSubTitle}>Passwords</Text>
            <Text style={styles.txtMain}>
              If you register to become a Member, you will be asked to choose a user name (or email address)
              and password. You are solely responsible for maintaining the confidentiality of this
              information. You are not permitted to allow anyone else to use your user name and password to
              log into the Service. You must notify us immediately if you suspect any unauthorized use of your
              account or access to your password. You are solely responsible for any and all use of your
              account so please be vigilant in protecting its confidentiality.
            </Text>

            <Text style={styles.txtSubTitle}>Your Use of the Service</Text>
            <Text style={styles.txtMain}>
              By using the EdanceSport LLC. Service, you consent to our using your mobile phone number or
              email address to send you Service-related notices, including any notices required by law,
              instead of communication by postal mail. We may also send you other messages via SMS, push
              notification or email, including changes to features of the Service and special offers. You have
              a non-transferable, non-exclusive license to access this Service, to view information contained
              at this Service and to interact with the Service solely for your own personal use and not for
              any commercial purpose, unless you have entered into a Merchant Subscription Agreement with us,
              in which case your use of the Service is also governed by such Merchant Subscription Agreement.
              You agree not to use the Service for any unlawful purpose and you also agree not to use any
              content from our Services unless the owner has given permission or it is permitted by law.
              Tampering with the Service, misrepresenting the identity or age of a user, using buying agents
              or conducting fraudulent activities on the Service are prohibited. We disclaim all liability and
              responsibility for the availability, responsiveness, reliability or security of the Service and
              reserve the right to suspend, modify, or discontinue the Service at any time without notice.
              EdanceSport LLC. is not responsible for any promotions or loyalty programs made available from
              Merchants through the Service.
            </Text>

            <Text style={styles.txtSubTitle}>User Content</Text>
            <Text style={styles.txtSubTitleSmall}>Generally</Text>
            <Text style={styles.txtMain}>
              We may, but are not obligated to, allow you to upload content for display through the Service.
              If we allow this feature, please choose carefully the information you post through the Service,
              provide to other Users and/or otherwise make available to us and through the Service. Do not
              include any form of prohibited content, as outlined below. Despite this prohibition,
              information, materials, products or services provided by other Members (for instance, in their
              profile or displayed on the Service in areas in which users can post content) may, in whole or
              in part, be unauthorized, impermissible or otherwise violate the Terms, and we assume no
              responsibility or liability for this material. If you become aware of misuse of the Service or
              its features by any person, please click on the “Contact Us” link on the Service pages and
              follow the directions as to how to contact us. We reserve the right, in our sole discretion, to
              reject, refuse to post or remove any posting by you, or to deny, restrict, suspend, or terminate
              your access to all or any part of the Service at any time, for any or no reason, with or without
              prior notice or explanation, and without liability. We expressly reserve the right to remove
              your profile and/or deny, restrict, suspend, or terminate your access to all or any part of the
              Service if we determine, in our sole discretion, that you have violated the Terms, pose a threat
              to us, our suppliers, our Merchants and/or our Users or for any other purpose we determine in
              our sole discretion.
            </Text>

            <Text style={styles.txtSubTitleSmall}>Proprietary Rights</Text>
            <Text style={styles.txtMain}>
              EdanceSport LLC. does not claim any ownership of any intellectual property rights for content
              (“Content”) that you post through the Service. You continue to retain any such rights that you
              may have in your Content, subject to the limited license herein. The Service may contain Content
              of Users and other licensors. Except as provided within the Terms, you may not copy, modify,
              translate, publish, broadcast, transmit, distribute, perform, display, or sell any content
              appearing on or through the Service. By displaying, publishing Content on the Service, or
              otherwise submitting Content to us (collectively, “posting”), you hereby grant to EdanceSport
              LLC. an irrevocable, perpetual, worldwide, royalty-free, non-exclusive license to use, modify,
              delete from, add to, create derivative works of, publicly perform, publicly display, reproduce
              and distribute (and to sublicense the foregoing rights through multiple tiers of licensees) such
              Content on or through the Service. From time to time, we may remove Content from the Service,
              permanently or temporarily. Make sure you have the rights needed to submit or post your Content
              through our Service. And remember that you are responsible for any fees, royalties or other
              monies owing by reason of any content you have posted. The Service also contains Content
              provided by EdanceSport LLC., including, without limitation, text, images and logos
              (“EdanceSport app Content”). EdanceSport LLC. Content is protected by United States of America
              copyright, trademark, patent, trade secret and other laws, and EdanceSport LLC. owns and retains
              all rights in the EdanceSport LLC. Content and the features and functionality of the EdanceSport
              app. hereby grants you a limited, revocable, non sub licensable license to reproduce and display
              the EdanceSport LLC Content (excluding any software code) solely for your personal use in
              connection with utilizing the products and services available through the Service.
            </Text>

            <Text style={styles.txtSubTitleSmall}>Content Posted.</Text>
            <Text style={styles.txtMain}>
              You agree to not use the Service to:{'\n\n'}
              a. upload, post, email, transmit or otherwise make available any Content that is unlawful,
              harmful, threatening, abusive, harassing, tortuous, defamatory, vulgar, obscene, libelous,
              invasive of another’s privacy, hateful, or racially, ethnically or otherwise objectionable; b.
              harm minors in any way; c. forge headers or otherwise manipulate identifiers in order to
              disguise the origin of any Content transmitted through the Service; d. upload, post, transmit or
              otherwise make available any Content that you do not have a right to make available under any
              law or under contractual or fiduciary relationships; e. upload, post, transmit or otherwise make
              available any unsolicited or unauthorized advertising, promotional materials or any other form
              of solicitation; f. upload, post, transmit or otherwise make available any material that
              contains software viruses or any other computer code, files or programs designed to interrupt,
              destroy or limit the functionality of any computer software or hardware or telecommunications
              equipment; g. interfere with or disrupt the Service or servers or networks connected to the
              Service, or disobey any requirements, procedures, policies or regulations of networks connected
              to the Service; or h. Intentionally or unintentionally violate any applicable local, state or
              provincial, national or international law; and/or collect or store personal data about other
              users in connection with the prohibited conduct and activities set forth in paragraphs a through
              g above. EdanceSport LLC. may reject, refuse to post or delete any Content for any or no reason,
              including, without limitation, Content that in the sole judgment of EdanceSport LLC. violates
              these Terms, including our Privacy Policy. We assume no responsibility for monitoring the
              Service for inappropriate Content or conduct. If at any time EdanceSport LLC. chooses, in its
              sole discretion, to monitor the Service, we nonetheless assume no responsibility for the
              Content, no obligation to modify or remove any inappropriate Content, and no responsibility for
              the conduct of the User submitting any such Content. You are solely responsible for your use of
              the Service, the Content that you post on or through the Service, and any material or
              information that you transmit to other Members and for your interactions with other Users.
            </Text>

            <Text style={styles.txtSubTitle}>Protection of Intellectual Property Rights.</Text>
            <Text style={styles.txtMain}>
              EdanceSport LLC. respects the intellectual property of others, and requires that our Users do
              the same. You may not upload, embed, post, email, transmit or otherwise make available any
              material that infringes any copyright, patent, trademark, trade secret or other proprietary
              rights of any person or entity. We reserve the right to terminate the Membership of anyone we
              suspect to be an infringer. If you believe that your work has been copied in a way that
              constitutes copyright infringement, or your intellectual property rights have been otherwise
              violated, please provide EdanceSport LLC.’s Copyright Agent the following information:
              {'\n\n'}
              1. an electronic or physical signature of the person authorized to act on behalf of the owner of
              the copyright or other intellectual property interest;
              {'\n\n'}
              2. a description of the copyrighted work or other intellectual property that you claim has been
              infringed;
              {'\n\n'}
              3. a description of where the material that you claim is infringing is located on the Site;
              {'\n\n'}
              4. your address, telephone number, and email address;
              {'\n\n'}
              5. a statement by you that you have a good faith belief that the disputed use is not authorized
              by the copyright owner, its agent, or the law; and
              {'\n\n'}
              6. a statement by you, made under penalty of perjury, that the above information in your notice
              is accurate and that you are the copyright or intellectual property owner or authorized to act
              on the copyright or intellectual property owner’s behalf.
              {'\n\n'}
              7. EdanceSport LLC.’s Copyright Agent for Notice of claims of copyright or other intellectual
              property infringement can be reached as follows: Copyright Carlos M Gutierrez, Jr c/o
              EdanceSport LLC., 25 Lynne Road, Sudbury, Mass. 01776 USA
            </Text>

            <Text style={styles.txtSubTitle}>Privacy</Text>
            <Text style={styles.txtMain}>
              We understand that your privacy is important. By using the Service, you are consenting to have
              your data transferred to and processed in United States. We intend to keep your data private.
              However, no system is perfect and EdanceSport LLC. will not be liable for access to your
              information on the Service by others. Please review our Privacy Policy which is incorporated by
              reference.
            </Text>

            <Text style={styles.txtSubTitle}>
              Disclaimers
            </Text>
            <Text style={styles.txtMain}>
              EdanceSport LLC. is not responsible for and makes no warranties, express or implied, as to any
              content on the Service, including, without limitation with respect to the accuracy and
              reliability of the EdanceSport app. Content, User Content or other Content posted on the Site or
              through the Service, whether caused by us, by Users, by any of the equipment or programming
              associated with or utilized by the Service, or otherwise. The User Content does not necessarily
              reflect the opinions or policies of EdanceSport LLC. Profiles and third party applications
              created and posted by Members of the Service may contain links to other websites. EdanceSport
              LLC. is not responsible for the content, accuracy or opinions expressed on such websites, and
              such websites are not necessarily investigated, monitored or checked for accuracy or
              completeness by EdanceSport LLC. Inclusion of any linked website in the Service does not imply
              approval or endorsement of the linked website by EdanceSport LLC. When you access these third
              party sites, you do so at your own risk. EdanceSport LLC takes no responsibility for third party
              advertisements or third party applications that are posted on the Site or through the Service,
              nor does it take any responsibility for the goods or services provided by its advertisers or
              merchants. EdanceSport LLC. is not responsible for the conduct, whether online or offline, of
              any User of the Service including, without limitation, any Content posted by any User. Some
              states/provinces do not allow the exclusion or limitation of certain warranties and/or
              liabilities, so certain of the above limitations or exclusions may not apply to you. The Site is
              provided “AS-IS” and “AS-AVAILABLE” and EdanceSport LLC. expressly disclaims any warranty of
              fitness for a particular purpose or non-infringement. EdanceSport LLC cannot guarantee and does
              not promise any specific results from use of the Site.
            </Text>

            <Text style={styles.txtSubTitle}>
              Limitations of Our Liability
            </Text>
            <Text style={styles.txtMain}>
              IN NO EVENT SHALL WE BE LIABLE FOR ANY DAMAGE, CLAIM OR LOSS INCURRED BY YOU, INCLUDING WITHOUT
              LIMITATION COMPENSATORY, INCIDENTAL, DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL OR EXEMPLARY
              DAMAGES, IRRESPECTIVE OF WHETHER WE HAVE BEEN INFORMED OF, KNEW OF, OR SHOULD HAVE KNOWN OF THE
              LIKELIHOOD OF SUCH DAMAGES. THIS LIMITATION APPLIES TO ALL CAUSES OF ACTION IN THE AGGREGATE
              INCLUDING WITHOUT LIMITATION BREACH OF CONTRACT, BREACH OF WARRANTY, DEFAMATION, NEGLIGENCE,
              STRICT LIABILITY, MISREPRESENTATION, AND OTHER TORTS, AS WELL AS THIRD-PARTY CLAIMS. IF THE
              WARRANTY EXCLUSIONS OR LIMITATIONS OF LIABILITY SET FORTH IN THIS USE AGREEMENT ARE FOR ANY
              REASON HELD UNENFORCEABLE OR INAPPLICABLE, YOU AGREE THAT OUR AGGREGATE LIABILITY SHALL NOT
              EXCEED THE AMOUNT YOU PAID TO EDANCESPORT LLC. IN THE PREVIOUS SIX (6) MONTHS FROM NOTIFICATION.
              The Service is controlled from its facilities in United States. EdanceSport LLC makes no
              representations that the Service is appropriate or available for use in other locations. Those
              who access or use the Service from other jurisdictions do so of their own volition and at their
              own risk and are responsible for compliance with local law.
            </Text>

            <Text style={styles.txtSubTitle}>Indemnification</Text>
            <Text style={styles.txtMain}>
              You agree to indemnify and hold EdanceSport LLC., its subsidiaries, and affiliates, and their
              respective officers, agents, partners and employees, harmless from any loss, liability, cost,
              expense, claim, or demand, including without limitation, reasonable attorneys’ fees, due or
              relating to or arising out of your use of the Service in violation of the Terms and/or arising
              from a breach of the Terms and/or any breach of your representations and warranties set forth in
              the Terms and/or arising out of or relating to any Content that you post or third party
              transaction that you enter or attempt to enter in connection with the Service.
            </Text>

            <Text style={styles.txtSubTitle}>Miscellaneous</Text>
            <Text style={styles.txtMain}>
              The Terms will be construed, and their performance enforced, under the laws of the province of
              Massachusetts, United States of America without reference to choice of law principles. Any
              dispute relating to the Terms or the Site may be litigated only in a court having jurisdiction
              and venue in the province of Massachusetts. The United Nations Convention on Contracts for the
              International Sale of Goods does not apply to the Terms. We may assign the Terms, in whole or in
              part, to a related entity or to a third party. EACH OF THE PARTIES HEREBY KNOWINGLY, VOLUNTARILY
              AND INTENTIONALLY WAIVES ANY RIGHT IT MAY HAVE TO A TRIAL BY JURY IN RESPECT OF ANY LITIGATION
              (INCLUDING BUT NOT LIMITED TO ANY CLAIMS, COUNTERCLAIMS, CROSS-CLAIMS, OR THIRD PARTY CLAIMS)
              ARISING OUT OF, UNDER OR IN CONNECTION WITH THIS AGREEMENT. FURTHER, EACH PARTY HERETO CERTIFIES
              THAT NO REPRESENTATIVE OR AGENT OF EITHER PARTY HAS REPRESENTED, EXPRESSLY OR OTHERWISE, THAT
              SUCH PARTY WOULD NOT IN THE EVENT OF SUCH LITIGATION, SEEK TO ENFORCE THIS WAIVER OF RIGHT TO
              JURY TRIAL PROVISION. EACH OF THE PARTIES ACKNOWLEDGES THAT THIS SECTION IS A MATERIAL
              INDUCEMENT FOR THE OTHER PARTY ENTERING INTO THE TERMS. The Terms are accepted upon your use of
              the Service or any of its features and is further affirmed upon you becoming a Member (if
              applicable). The Terms constitute the entire agreement between you and EdanceSport LLC.
              regarding the use of Service and its features. The failure of EdanceSport LLC. to exercise or
              enforce any right or provision of the Terms shall not operate as a waiver of such right or
              provision. The section titles in the Terms are for convenience only and have no legal or
              contractual effect. The Terms operate to the fullest extent permissible by law. If any provision
              of the Terms is unlawful, void or unenforceable, that provision is deemed severable from the
              Terms and does not affect the validity and enforceability of any remaining provisions.
            </Text>

            <Text style={styles.txtSubTitle}>Term of Agreement</Text>
            <Text style={styles.txtMain}>
              While we look forward to providing you with excellent service for a long period of time, you may
              cancel your EdanceSport LLC. account at any time with no further obligation to EdanceSport LLC.
              by following the instructions available from the Service, unless otherwise agreed to by you and
              EdanceSport LLC. EdanceSport LLC. may terminate your account and your use of the Service at any
              time without notice.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
