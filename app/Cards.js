import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import React from 'react';

const CardFace = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text>{props.label}</Text>
        </View>
      </View>
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyCS}>
        {props.children}
      </ScrollView>
    </View>
  );
};

const fontSize = 19;

const P = (props) => (
  <Text style={{ fontSize: fontSize, marginTop: 7, marginBottom: 7 }}>
    {props.children}
  </Text>
);
const B = (props) => (
  <Text style={{ fontSize: fontSize, fontWeight: 'bold' }}>
    {props.children}
  </Text>
);
const I = (props) => (
  <Text style={{ fontSize: fontSize, fontStyle: 'italic' }}>
    {props.children}
  </Text>
);

const IMG = (props) => {
  return <Image style={styles.cfImage} source={{ uri: props.uri }} />;
};

const UL = (props) => {
  return (
    <View style={{ marginTop: 7, marginBottom: 7 }}>{props.children}</View>
  );
};
const ULI = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ fontSize: fontSize }}>{'\u2022'}</Text>
      <Text style={{ fontSize: fontSize, flex: 1, paddingLeft: 7 }}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#aaa',
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'column',
    margin: 20,
  },
  header: {
    alignItems: 'flex-start',
    borderColor: '#aaa',
    borderBottomWidth: 1,
  },
  headerContainer: {
    margin: 7,
  },
  headerText: {
    color: 'gray',
  },
  body: {
    flex: 1,
  },
  bodyCS: {
    flexGrow: 1,
    justifyContent: 'center',
    margin: 20,
  },
  cfImage: {
    resizeMode: 'contain',
    width: '100%',
    height: 400,
    marginTop: 7,
    marginBottom: 7,
  },
});

const cards = [
  {
    front: (
      <CardFace label="Q. #1">
        <P>
          What was the original purpose of the Philadelphia Convention in 1787?
        </P>
      </CardFace>
    ),
    back: (
      <CardFace label="A. #1">
        <P>
          The meeting in Philadelphia had been called to discuss revising the
          Articles of Confederation, but the delegates quickly decided to scrap
          the articles and drafted a new governing document.
        </P>
        <Text style={{ marginTop: 7, color: 'gray', fontStyle: 'italic' }}>
          source text
        </Text>
      </CardFace>
    ),
  },
  {
    front: (
      <CardFace label="Q. #2">
        <P>What is the name of this famous work of art???</P>

        <IMG uri="https://s3.amazonaws.com/brainscape-prod/system/cm/157/583/282/q_image_original.png" />
      </CardFace>
    ),
    back: (
      <CardFace label="A. #2">
        <P>
          <B>Mona Lisa</B> (1517) by Leonardo da Vinci
        </P>

        <P>
          The <I>Mona Lisa</I> is shrouded in mystery even today. People
          speculate as to who the woman in the painting was, and what her faint
          smile might mean. The painting was once stolen, but was recovered in
          the early 1900s.
        </P>
      </CardFace>
    ),
  },
  {
    front: (
      <CardFace label="Q. #3">
        <P>Describe the fundamental tenets of the Virginia Plan:</P>
      </CardFace>
    ),
    back: (
      <CardFace label="A. #3">
        <P>The Virginia Plan proposed:</P>

        <UL>
          <ULI>
            three branches of government with the legislative branch as the most
            powerful
          </ULI>
          <ULI>
            a bicameral (two-house) legislature, with the number of legislators
            in both houses tied to population
          </ULI>
          <ULI>
            members of the upper house chosen by the lower house, and executive
            chosen by both houses
          </ULI>
        </UL>

        <P>
          The Virginia Plan was supported by the larger states of Virginia,
          Pennsylvania, and New York because it was tied to population.
        </P>
      </CardFace>
    ),
  },
  {
    front: (
      <CardFace label="Q. #4">
        <P>
          In opposition to the Virginia Plan, delegates from smaller states
          supported the New Jersey Plan. What were this plan's key terms?
        </P>
      </CardFace>
    ),
    back: (
      <CardFace label="A. #4">
        <P>The New Jersey Plan's terms included:</P>

        <UL>
          <ULI>
            an elected unicameral (one-house) legislature, with equal
            representation for each state
          </ULI>
          <ULI>an executive, chosen by the legislature</ULI>
          <ULI>a judiciary, chosen by the executive</ULI>
          <ULI>
            a legislature that could regulate interstate and foreign commerce
            and establish tariffs
          </ULI>
        </UL>
      </CardFace>
    ),
  },
  {
    front: (
      <CardFace label="Q. #5">
        <P>
          Which 20th-century American artist is best known as a founder and
          leading figure of the Pop Art movement?
        </P>
      </CardFace>
    ),
    back: (
      <CardFace label="A. #5">
        <P>
          <B>Andy Warhol</B>
        </P>

        <P>
          His major works include the film Chelsea Girls and the painting{' '}
          <I>Campbell's Soup Cans</I>.
        </P>

        <IMG uri="https://s3.amazonaws.com/brainscape-prod/system/cm/157/583/283/a_image_original.png" />
      </CardFace>
    ),
  },
  {
    front: (
      <CardFace label="Q. #6">
        <P>
          Which English rock band of the 1960s formed in Liverpool and became
          the <B>best-selling band of all time</B>, with albums including{' '}
          <I>Rubber Soul</I>, <I>Revolver</I>,{' '}
          <I>Sgt. Pepper's Lonely Hearts Club Band</I>, and <I>Abbey Road</I>?
        </P>
      </CardFace>
    ),
    back: (
      <CardFace label="A. #6">
        <P>
          <B>The Beatles</B>
        </P>

        <P>
          Its four members were John Lennon, Paul McCartney, George Harrison,
          and Ringo Starr.
        </P>

        <IMG uri="https://s3.amazonaws.com/brainscape-prod/system/cm/157/583/405/a_image_original.png" />
      </CardFace>
    ),
  },
  {
    front: (
      <CardFace label="Q. #7">
        <P>
          Which Barbadian pop recording artist of the 21st century sings the hit
          songs "Umbrella", "Don't Stop the Music", "Rude Boy", "What's My
          Name?", and "We Found Love"?
        </P>
      </CardFace>
    ),
    back: (
      <CardFace label="A. #7">
        <P>
          <B>Rihanna</B>
        </P>

        <IMG uri="https://s3.amazonaws.com/brainscape-prod/system/cm/157/583/407/a_image_original.png" />
      </CardFace>
    ),
  },
  {
    front: (
      <CardFace label="Q. #8">
        <P>
          Which American punk rock band from California is famous for hit songs
          "Boulevard of Broken Dreams", "When I Come Around", and "Good Riddance
          (Time Of Your Life)"?
        </P>
      </CardFace>
    ),
    back: (
      <CardFace label="A. #8">
        <P>
          <B>Green Day</B>
        </P>

        <P>
          Green Day is an American rock band formed in the East Bay of
          California in 1987 by lead vocalist and guitarist Billie Joe Armstrong
          and bassist and backing vocalist Mike Dirnt. For much of the band's
          career, they have been a trio with a drummer Tré Cool, who replaced
          John Kiffmeyer in 1990 before the recording of the band's second
          studio album, Kerplunk (1991). Touring guitarist Jason White became a
          full-time member in 2012, but returned to his role as a touring member
          in 2016.
        </P>

        <IMG uri="https://s3.amazonaws.com/brainscape-prod/system/cm/157/583/408/a_image_original.png" />

        <P>
          Green Day was originally part of the late-'80s/early-'90s punk scene
          at the DIY 924 Gilman Street club in Berkeley, California. The band's
          early releases were with the independent record label Lookout!
          Records. In 1994, their major-label debut Dookie, released through
          Reprise Records, became a breakout success and eventually shipped over
          10 million copies in the U.S. Green Day is credited alongside fellow
          California punk bands NOFX, Sublime, Bad Religion, the Offspring,
          Rancid, and Jawbreaker with popularizing mainstream interest in punk
          rock in the U.S.
        </P>

        <P>
          Though the albums Insomniac (1995), Nimrod (1997), and Warning (2000)
          did not match the success of Dookie, they were still successful with
          the former two reaching double platinum status while the latter
          achieved gold. Green Day's seventh album, a rock opera called American
          Idiot (2004), found popularity with a younger generation, selling six
          million copies in the U.S. Their next album, 21st Century Breakdown,
          was released in 2009 and achieved the band's best chart performance.
          It was followed by a trilogy of albums, ¡Uno!, ¡Dos!, and ¡Tré!,
          released in September, November, and December 2012, respectively. The
          trilogy did not perform as well as expected commercially in comparison
          to their previous albums largely due to lack of promotion and
          Armstrong entering rehab. Their twelfth studio album, Revolution
          Radio, was released in October 2016 and became their third to debut at
          No. 1 on the Billboard 200. The band's thirteenth studio album, Father
          of All Motherfuckers, was released on February 7, 2020.
        </P>

        <P>
          Green Day has sold more than 75 million records worldwide, making them
          one of the best-selling music artists of all time.[1] The group has
          been nominated for 20 Grammy awards and has won five of them with Best
          Alternative Album for Dookie, Best Rock Album for American Idiot and
          21st Century Breakdown, Record of the Year for "Boulevard of Broken
          Dreams", and Best Musical Show Album for American Idiot: The Original
          Broadway Cast Recording.
        </P>

        <P>
          In 2010, a stage adaptation of American Idiot debuted on Broadway. The
          musical was nominated for three Tony Awards: Best Musical, Best Scenic
          Design, and Best Lighting Design, winning the latter two. The band was
          inducted into the Rock and Roll Hall of Fame in 2015, their first year
          of eligibility. In 2018, members of Green Day, along with several
          friends, formed the side project The Coverups to perform cover songs.
        </P>
      </CardFace>
    ),
  },
  {
    front: (
      <CardFace label="Q. #9">
        <P>Which blood vessels supply the liver?</P>
      </CardFace>
    ),
    back: (
      <CardFace label="A. #9">
        <P>
          The liver receives blood from the <B>hepatic portal vein</B> and the{' '}
          <B>hepatic arteries</B>.
        </P>

        <P>
          Portal circulation carries nutrient-rich blood from the digestive
          tract for processing, while the hepatic arteries supply oxygenated
          blood as part of the systemic circulation.
        </P>

        <IMG uri="https://s3.amazonaws.com/brainscape-prod/system/cm/157/583/989/a_image_original.png" />
      </CardFace>
    ),
  },
  {
    front: (
      <CardFace label="Q. #10">
        <P>
          What is the shape of the trichloromethane (HCCl
          <Text style={{ fontSize: 14 }}>3</Text>) molecule?
        </P>
      </CardFace>
    ),
    back: (
      <CardFace label="A. #10">
        <P>
          Trichloromethane is <B>tetrahedral</B>.
        </P>

        <P>
          Since the central carbon is bonded to four atoms, it is sp3
          hybridized. This means that the four atoms are arranged around it in a
          tetrahedron.
        </P>

        <IMG uri="https://s3.amazonaws.com/brainscape-prod/system/cm/157/584/526/a_image_original.gif" />
      </CardFace>
    ),
  },
];

export { cards as default, CardFace };
