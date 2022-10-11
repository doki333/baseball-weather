import ScrollContainer from 'react-indiana-drag-scroll'
import { cx } from 'styles'
import { IDataTypes, ITableTypes } from 'types/weather'

import styles from './dataTable.module.scss'

const keywordArr = [
  { title: 'fcstTime', value: '시간' },
  { title: 'T1H', value: '온도' },
  { title: 'RN1', value: '강수량' },
  { title: 'SKY', value: '날씨' },
  { title: 'REH', value: '습도' },
  { title: 'PTY', value: '강수형태' },
]

const DataTable = ({ data }: ITableTypes) => {
  return (
    <div className={styles.dataWrapper}>
      <ul className={styles.titleWrapper}>
        {keywordArr.map((title) => (
          <li key={title.title}>{title.value}</li>
        ))}
      </ul>
      <ScrollContainer component='table' className={styles.tableInner}>
        <tbody>
          {keywordArr.map((word) => (
            <tr key={`tableData-${word.value}`}>
              {data.map((dData: IDataTypes) => (
                <td
                  className={cx(styles.tableD, { [styles.hasMinHeight]: word.title === 'RN1' })}
                  key={`innerData-${dData.fcstTime}`}
                >
                  {dData[word.title]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </ScrollContainer>
    </div>
  )
}

export default DataTable
