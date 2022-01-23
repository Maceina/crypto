import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import { theme } from "styles/theme";
import Calculator from "components/calculator";

import { makeStyles } from "@material-ui/core";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Slide from "@mui/material/Slide";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      padding: "0 12.5rem",
      alignContent: "center",
      alignItems: "center",
      position: "relative",
      columnGap: "2rem",

      [theme.breakpoints.up("xl")]: {
        padding: "0rem 15rem",
      },

      "&:before": {
        content: "''",
        height: "100vh",
        position: "absolute",
        width: "115vw",
        top: "-9rem",
        right: "-15rem",
        borderRadius: "50px",
        backgroundColor: theme.palette.primary.main,
        zIndex: "-100",
        transform: "rotate(-2deg)",

        [theme.breakpoints.down("sm")]: {
          display: "none",
        },

        [theme.breakpoints.up("xl")]: {
          height: "97vh",
          width: "105vw",
        },
      },

      [theme.breakpoints.down("sm")]: {
        padding: "5rem 1.25rem",
        background: theme.palette.primary.main,
        gridTemplateColumns: "1fr",
        justifyItems: "center",
        gap: "0rem",
        clipPath: "polygon(0 0, 100% 0%, 100% 95%, 0% 100%)",
      },
    },

    calculator: {
      width: "100%",
      maxWidth: "400px",
      height: "100%",
      gridRow: "1 / 3",
      gridColumn: "2 / 3",
      justifySelf: "flex-end",
      [theme.breakpoints.down("sm")]: {
        gridRow: "2 / 3",
        gridColumn: "1 / 2",
        justifySelf: "inherit",
      },
    },

    paragraph: {
      maxWidth: "450px",
      alignSelf: "flex-start",
      padding: "2em 0",
    },

    h1: {
      color: theme.typography.h1.color,
      fontSize: theme.typography.h1.fontSize,
      lineHeight: theme.typography.h1.lineHeight,
      [theme.breakpoints.down("sm")]: {
        fontSize: "2rem",
        marginBottom: "2rem",
      },
    },

    p: {
      color: theme.typography.body2.color,
      fontSize: theme.typography.body2.fontSize,
      lineHeight: theme.typography.body2.lineHeight,

      [theme.breakpoints.down("sm")]: {
        maxWidth: 315,
      },
    },

    button: {
      color: theme.palette.secondary.main,
      padding: 0,
      margin: "2rem 0",
      transition: "all 0.3s",

      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  };
});

interface Props {
  currencies: string[];
  rates: {
    merchant: object[];
  };
}

const Home: NextPage<Props> = ({ rates, currencies }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>But, Sell, Manage & Accept cryptocurrencies</title>
      </Head>

      <Box className={classes.root}>
        <Box sx={{ alignSelf: "flex-end" }}>
          <h1 className={classes.h1}>
            <span style={{ color: theme.palette.secondary.main }}>
              Buy Bitcoin,{" "}
            </span>
            Ethereum, Litecoin and other crypto{" "}
            <span style={{ color: theme.palette.secondary.main }}>online</span>
          </h1>
        </Box>

        <Box className={classes.calculator}>
          <Calculator rates={rates} currencies={currencies} />
        </Box>

        <Box className={classes.paragraph}>
          <p className={classes.p}>
            Why bother going through complicated exchanges? Buy cryptocurrency
            with top payment methods like SEPA bank transfer, Credit and Debit
            Card, Apple Pay, Mobile balance or Klarna. You can buy Bitcoin,
            Ethereum or any other popular crypto directly to your personal
            wallet without making any initial deposits. It&apos;s as easy as it
            gets!
          </p>

          <Button
            className={classes.button}
            endIcon={<KeyboardArrowRightIcon color="inherit" />}
            variant="text"
            onClick={() => {
              router.push("/resources");
            }}
          >
            Start Now
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await axios.get("https://api.coingate.com/v2/rates");

  return {
    props: {
      rates: response.data,
      currencies: Object.keys(response.data.merchant),
    },

    revalidate: 600,
  };
};
