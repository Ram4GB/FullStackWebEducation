import React from 'react';
import ReactExport from 'react-data-export';
import { Button, Icon } from 'antd';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class ExportTableClassToExcel extends React.Component {
  render() {
    const { dataSource } = this.props;
    return (
      <div>
        <ExcelFile
          element={
            <Button type="primary">
              <Icon type="export" />
              Export To Excel
            </Button>
          }
        >
          <ExcelSheet data={dataSource} name="sheetttt">
            <ExcelColumn label="id" value="id" />
            <ExcelColumn label="name" value="name" />
          </ExcelSheet>
        </ExcelFile>
      </div>
    );
  }
}
