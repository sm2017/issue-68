import React, {Component} from "react";
import {RecyclerListView, LayoutProvider, DataProvider} from "recyclerlistview";
import {View, Dimensions, Text} from "react-native";
import FlightCard from "./FlightCard";
import HotelCard from "./HotelCard";
import TopWidget from "./TopWidget";
import { connect } from 'react-redux'

let {height, width} = Dimensions.get('window');
class FlightsPageComponent extends Component {
    constructor(args) {
        super(args);
        this._layoutProvider = new LayoutProvider((i) => {
            return this.props.dataProvider.getDataForIndex(i).type;
        }, (type, dim) => {
            switch (type) {
                case "HOTEL_ITEM":
                    dim.width = width;
                    dim.height = 83;
                    break;
                case "FL_ITEM":
                    dim.width = width;
                    dim.height = 80;
                    break;
                case "HEADER":
                    dim.width = width;
                    dim.height = 300;
                    break;
                default:
                    dim.width = width;
                    dim.height = 0;

            }
        });
        this._renderRow = this._renderRow.bind(this);
    }


    _renderRow(type, data) {
        switch (type) {
            case "HOTEL_ITEM":
                return <HotelCard/>
            case "FL_ITEM":
                return <FlightCard data={data}/>;
            case "HEADER":
                return <TopWidget data={data}/>;
            default:
                return null;

        }

    }

    render() {
        return <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Travel Mate</Text>
            </View>
            <RecyclerListView rowRenderer={this._renderRow} dataProvider={this.props.dataProvider}
                              layoutProvider={this._layoutProvider}/>
        </View>
    }
}
const styles = {
    container: {
        flex: 1,

    },
    header:{
        height: 65,
        backgroundColor:'orange',
        alignItems:"center",
        flexDirection:"row",
        elevation:4
    },
    headerText:{
        color:'white',
        fontSize:18,
        marginLeft: 16,
        paddingBottom:3
    },
    backIcon:{
        height:23,
        width:23,
        marginLeft:16

    }
}

const mapStateToProps = state => {
    console.log('state',state);
  return {
    dataProvider: new DataProvider((r1, r2) => {
        console.log(' r1 !== r2', r1 !== r2,r1,r2);
      return r1 !== r2
    }).cloneWithRows(state)
  }
}


const FlightsPage = connect(
  mapStateToProps
)(FlightsPageComponent)

export default FlightsPage