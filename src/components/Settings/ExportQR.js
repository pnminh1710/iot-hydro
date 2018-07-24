import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { database } from '../../firebase';

const stylePrint = {
  marginLeft: 'auto',
  marginRight: 'auto',
}

class ExportQR extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlList: [],
      loading: true,
      totalLine: 0,
      totalPage: 1,
    };
    this.doCreateUrlList = this.doCreateUrlList.bind(this);
    this.printDocument = this.printDocument.bind(this);
  }

  componentDidMount() {
    Promise
      .all([database.getAllProducts(), database.getCurrentProject()])
      .then(([products, currentProject]) => {
        console.log(products.val());
        const length = products.val().length;
        const totalProducts = parseInt(currentProject.val().totalProducts, 10)
        const filterList = products.val().slice(length - totalProducts);
        this.doCreateUrlList(filterList);
      });
  };

  doCreateUrlList(productList) {
    const urlList = productList.map(product => product.url);
    const totalLine = (urlList.length - 1) / 4 + 1;
    const totalPage = totalLine / 5 + 1;
    this.setState({ urlList, totalLine, totalPage });
  };

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("download.pdf");
        this.props.changeStep();
      });
  }

  render() {
    const { urlList } = this.state;
    return (
      <div id="divToPrint">
        <div  style={stylePrint}>
          {urlList.map(url =>
            <div className="qrcode">
              <QRCode value={url} size={64} renderAs="svg" />
            </div>)}
        </div>
        <button className="button" onClick={this.printDocument}>Print</button>
      </div>
    );
  }
}

export default ExportQR;