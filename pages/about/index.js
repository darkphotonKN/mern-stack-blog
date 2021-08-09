import { useState, useEffect } from 'react';

import Layout from '../../components/shared/Layout/Layout';
import QuoteBlock from '../../components/shared/MainContent/QuoteBlock';

import { fetchData } from '../../api/helper';

const AboutIndex = () => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    async function getData() {
      const profileData = await fetchData('/api/profile/all');

      const aboutData = profileData.find((item) => item.type === 'about');

      setData(aboutData);
    }

    getData();
  }, []);

  console.log('About Data:', data);

  return (
    <Layout subtitle={'About'} sidebar>
      <section id="about">
        <div className="row mt-4">
          {/* col-d-12 offset-0 offset-md-1 */}
          <div className="col-12">
            <QuoteBlock
              content={'「你的氣質裡，藏著你走過的路，讀過的書和愛過的人。」'}
              author={'《卡薩布蘭卡》'}
            />

            <div className="main-content mt-4">
              {data
                ? data.content
                    .split('\n')
                    .map((paragraph) => (
                      <p key={paragraph.slice(0, 5)}>{paragraph}</p>
                    ))
                : null}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutIndex;
