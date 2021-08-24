/* eslint-disable no-return-assign */
import React from 'react';
import Layout from '@components/Layout';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Title from '@components/shared/Title';
import { Masonry } from 'masonic';
import pmonks from '../src/pmonk';

const ImageCard = ({ data: { id, src } }) => (
  <div key={id} style={{ display: 'flex', flexDirection: 'column', width: '100%', transition: 'transform 100ms ease-in-out' }}>
    <img alt="pmonk" style={{ width: '100%', display: 'block' }} src={src.src} />
  </div>
);

const shuffle = (array) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  [...Array(array.length)]
    .map((...args) => Math.floor(Math.random() * (args[1] + 1)))
    // eslint-disable-next-line no-param-reassign
    .reduce((a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array);

const PmonkFirehose = ({ title, description }) => {
  // eslint-disable-next-line max-len
  const [items] = React.useState(() => Array.from(Array(pmonks.length), (index, i) => ({ id: i, src: pmonks[i] })));

  shuffle(items);

  return (
    <Layout pageTitle={`${title} | About`} description={description}>
      <Container maxWidth="lg" style={{ backgroundColor: '#fafafa' }}>
        <Title>
          pmonk firehose
        </Title>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {pmonks.length}
          {' '}
          images randomly served up :)
        </Typography>
        <div>
          <Masonry
            items={items}
            columnGutter={2}
            columnWidth={300}
            overscanBy={2}
            render={ImageCard}
          />
        </div>
      </Container>
    </Layout>
  );
};

export default PmonkFirehose;

export async function getStaticProps() {
  const configData = await import('../siteconfig.json');

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  };
}
