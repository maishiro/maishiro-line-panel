import React, { useEffect, useRef, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import * as d3 from 'd3';
import image1 from '../img/image1.png';
import image2 from '../img/image2.png';
import image3 from '../img/image3.png';


interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

interface ProcessData {
  index: number;
  work: number;
  imagePath: string;
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, replaceVariables }) => {
  // const theme = useTheme2();
  const styles = useStyles2(getStyles);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [configLine, setConfigLine] = useState<ProcessData[]>([]);

  // 'configuration' Query の結果を使用
  let processes: ProcessData[] = [];
  const data1 = data.series.find( (el, idx) => {
    return el.refId==='configuration';
  });
  if( data1 != null ) {
    if( 0 < data1.length ) {
      const cfgStructure = JSON.parse( data1.fields[0].values[0] );
      processes = cfgStructure?.process;
    }
  }
  // // 提供されたJSONデータ
  // const data2 = {
  //   lines: [
  //     {
  //       line: "foodA",
  //       process: [
  //         {
  //           index: 1,
  //           work: 1,
  //           // imagePath: "../img/image1.png" // 画像ファイルのパス1
  //           imagePath: image1
  //         },
  //         {
  //           index: 2,
  //           work: 2,
  //           // imagePath: "../img/image2.png" // 画像ファイルのパス2
  //           imagePath: image2
  //         },
  //         {
  //           index: 3,
  //           work: 3,
  //           // imagePath: "../img/image3.png" // 画像ファイルのパス3
  //           imagePath: image3
  //         }
  //       ]
  //     }
  //   ]
  // };
  // // データの"process"部分を選択
  // processes = data2.lines[0].process;
  const strPrev = JSON.stringify(configLine);
  const strNow  = JSON.stringify(processes);
  if( strPrev !== strNow ) {
    console.log( 'setConfigLine' );
    setConfigLine( processes );
  }


  useEffect(() => {
    // SVG要素を選択
    const svg = d3.select(svgRef.current);

    // 各プロセスを横に並べる間隔
    const processSpacing = 50;
    // 各プロセスに対して画像を読み込んで幅と高さを取得し、表示
    svg.selectAll("image")
      .data(configLine)
      .enter()
      .append("image")
      .attr("x", (d, i) => i * processSpacing) // プロセスを横に並べる
      .attr("y", 50) // 画像の縦位置
      .attr("width", 50) // 画像の幅
      .attr("height", 50) // 画像の高さ
      .attr("xlink:href", (d) => {
          switch( d.work ) {
              case 1:
                  return image1;
              case 2:
                  return image2;
              case 3:
                  return image3;
              default:
                  return image1;
          }        
      } ); // 表示画像
  }, [configLine]);

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div>
        <svg className={styles.svg} width={width} height={height} ref={svgRef}></svg>
      </div>

      <div className={styles.textBox}>
        {options.showSeriesCount && <div>Number of series: {data.series.length}</div>}
        <div>Text option value: {options.text}</div>
      </div>
    </div>
  );
};
