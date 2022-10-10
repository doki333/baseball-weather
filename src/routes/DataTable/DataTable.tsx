import ScrollContainer from 'react-indiana-drag-scroll'
import { IDataTypes, ITableTypes } from 'types/weather'

import styles from './dataTable.module.scss'

interface IValueObj {
  T1H: string
  RN1: string
  SKY: string
  REH: string
  PTY: string
  [key: string]: string
}

const keywordArr = ['fcstTime', 'T1H', 'RN1', 'SKY', 'REH', 'PTY']
const headObj: IValueObj = {
  fcstTime: '시간',
  T1H: '온도',
  RN1: '강수량',
  SKY: '날씨',
  REH: '습도',
  PTY: '강수 형태',
}

const DataTable = ({ data }: ITableTypes) => {
  return (
    <ScrollContainer className={styles.tableWrapper}>
      <table className={styles.tableInner}>
        <tbody>
          {keywordArr.map((word: string) => (
            <tr key={`tableData-${word}`}>
              <th className={styles.tableHead}>{headObj[word]}</th>
              {data.map((dData: IDataTypes) => (
                <td key={`innerData-${dData.fcstTime}`}>{dData[word]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollContainer>
  )
}

export default DataTable

{
  /* <thead>
        <th>시간</th>
        {data.map((hData: IDataTypes) => (
          <th key={hData.fcstTime}>{hData.fcstTime}</th>
        ))}
      </thead> */
}
