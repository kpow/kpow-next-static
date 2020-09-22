import Layout from '@components/Layout'

const About = ({ title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={`${title} | About`} description={description}>
        <h1 className="title">kpow-next!</h1>

        <p className="description">
        Digital Architect - Leader - Maker. Director of E-Commerce at Barefoot Spas, Voracious Reader and Dad.
        <br></br>
        Travel, Ukes, Pugs, and Pixels.
        </p>

        <p>
          You can check out the{' '}
          <a href="https://github.com/kpow/kpow-next-static">
            repo here.
          </a>
        </p>

      </Layout>
    </>
  )
}

export default About

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
