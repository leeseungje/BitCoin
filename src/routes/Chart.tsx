import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface chartProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
function Chart({ coinId }: chartProps) {
  const { isLoading, data: dataSource } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "candlestick",
              data: dataSource.map((item) => {
                const list = [
                  item.open.toFixed(2),
                  item.high.toFixed(2),
                  item.low.toFixed(2),
                  item.close.toFixed(2)
                ];
                return {
                  x: new Date(item.market_cap),
                  y: list
                };
              })
            }
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 300,
              width: 500,
              toolbar: {
                show: false
              },
              background: "white"
            },
            title: {
              text: `${coinId} Chart`,
              align: "right"
            },
            yaxis: {
              tooltip: {
                enabled: true
              }
            },
            xaxis: {
              labels: {
                show: false
              },
              axisTicks: {
                show: false
              },
              axisBorder: {
                show: false
              }
            }
          }}
        />
      )}
    </div>
  );
}
export default Chart;
