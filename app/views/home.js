import React from "react";
import { translate } from "focus-core/translation";

import Article from "@/components/article";
import Section from "@/components/article/section";

const HomeView = () => {
  const rules = translate("home.paragraphs.rules", { returnObjects: true }).map(
    (rule, i) => {
      return <li key={i}>{rule}</li>;
    }
  );
  const pubgRules = translate("home.paragraphs.pubgRules", {
    returnObjects: true
  }).map((handi, i) => {
    return <li key={i}>{handi}</li>;
  });

  const handicaps = translate("home.paragraphs.handicaps", {
    returnObjects: true
  }).map((handi, i) => {
    return <li key={i}>{handi}</li>;
  });

  return (
    <div data-app="home-page">
      <Article>
        <h1 className="display-1">
          {"Fight for "}
          <span className="green">{"Sub"}</span>
        </h1>
        <Section title={translate("home.titles.whatIsIt")}>
          <p>{translate("home.paragraphs.game")}</p>
          <p>{translate("home.paragraphs.sub")}</p>
        </Section>
        <Section title={translate("home.titles.rules")}>
          <h3 className="subheading title-blue">
            {translate("home.titles.basicRules")}
          </h3>
          <p className="warning-box">
            {translate("home.paragraphs.discordWarning")}
          </p>

          <ul>{rules}</ul>
          <p className="warning-box">
            {translate("home.paragraphs.vocalWarning")}
          </p>
          <h3 className="subheading title-blue">
            {translate("home.titles.pubgRules")}
          </h3>
          {/* <div className='section-inner'> */}
          <ul>{pubgRules}</ul>
          {/* </div> */}
          {/* <div className="section-inner">
            {
              <h4 className="subheading title-green">
                {translate("home.titles.mcDropContent")}
              </h4>
            }
            <ul>{mcDrops}</ul>
          </div> */}

          <h3 className="subheading title-blue">
            {translate("home.titles.handicaps")}
          </h3>

          {/* <div className='section-inner'> */}
          {/* <h4 className='subheading title-green'>
                            {translate('home.titles.h1z1HandicapsT1')}
                        </h4> */}
          <ul>{handicaps}</ul>
          {/* <h4 className='subheading title-green'>
                            {translate('home.titles.h1z1HandicapsT2')}
                        </h4>
                        <ul>{h1z1HandicapsT2}</ul> */}
          {/* </div> */}
        </Section>
      </Article>
    </div>
  );
};

export default HomeView;
