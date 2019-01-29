import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Nouislider from "react-nouislider";
import SearchDropdown from "./SearchDropdown";

const style = {
  sliderCon: {
    marginTop: "23px",
  },
  priceRange: {
    fontWeight: "bold",
  },
  right: {
    float: "right",
    display: "block",
  },
  subCons: {
    marginBottom: "30px",
  },
};

class AdvanceSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slideRange: props.slideRange,
      slideState: props.slideState,
      slideStep: props.slideStep,
    };
    this.slideChange = this.slideChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      slideRange: { min: Number(newProps.slideRange.min), max: Number(newProps.slideRange.max) },
      slideState: newProps.slideState.map(item => Number(item)),
      slideStep: newProps.slideStep,
    });
  }

  formatCurrency = (num) => {
    num = num.toString().replace(/\$|\,/g, ""); // eslint-disable-line no-useless-escape
    if (isNaN(num)) {
      num = "0";
    }

    const sign = (num == (num = Math.abs(num))); // eslint-disable-line eqeqeq
    num = Math.floor(num * 100 + 0.50000000001);
    let cents = num % 100;
    num = Math.floor(num / 100).toString();

    if (cents < 10) {
      cents = `0${cents}`;
    }

    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i += 1) {
      num = `${num.substring(0, num.length - (4 * i + 3))},${num.substring(num.length - (4 * i + 3))}`;
    }

    return (`${((sign) ? "" : "-")}$${num}.${cents}`);
  }

  slideChange(values) {
    const val = values.map(item => Number(item));
    this.setState({ slideState: val });
  }

  render() {
    const { classes, data, slideEvent, ...filters } = this.props;
    const { slideRange, slideState, slideStep } = this.state;

    return (
      <div className={`slider slider-info ${classes.sliderCon}`}>
        <div className={classes.subCons}>
          <p className={classes.priceRange}>
            <span>
              {this.formatCurrency(slideState[0])}
            </span>
            <span className={classes.right}>
              {this.formatCurrency(slideState[1])}
            </span>
          </p>
          <Nouislider
            start={slideState}
            connect={[false, true, false]}
            step={slideStep}
            range={slideRange}
            onSlide={this.slideChange}
            onSet={slideEvent}
          />
        </div>
        <div className={classes.subCons}>
          <SearchDropdown data={data} filters={filters} />
        </div>
      </div>
    );
  }
}

export default withStyles(style)(AdvanceSearch);
