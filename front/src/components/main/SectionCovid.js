import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import styles from "../../css/main/Graph.module.css";

function SectionCovid({ active }) {
  const [graph, setGraph] = useState([]); // graph 그릴 data를 저장할 상태
  const [labelVisible, setLabelVisible] = useState(false);
  const COLORS = ["#8884d8", "#E8B754"];

  const handleResizeEvent = () => {
    const visible = window.innerWidth <= 800;
    setLabelVisible(visible);
  };

  useEffect(() => {
    Api.get("graphs/covid-weekly").then((res) => setGraph(res.data));
    handleResizeEvent();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResizeEvent);

    return () => {
      window.removeEventListener("resize", handleResizeEvent);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.graphWrapper}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="percent"
              data={graph}
              label={!labelVisible}
              innerRadius={80}
              isAnimationActive={active}
            >
              {graph.map((e, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.textWrapper}>
        <h1>예전처럼 다시 여행갈 수 있을까요?</h1>
        <p>
          전 세계, 미슐랭 레스토랑을 보유하고 있는 국가 36국을 대상으로 코로나
          확진자 수를 조사한 결과 최근{" "}
          <span className={active ? styles.underline : ""}>
            2주간 코로나 확진자 수가 감소했다는 결과를 보인 국가가 무려 85%에
            달하고 있어요.
          </span>
        </p>
      </div>
    </div>
  );
}

export default SectionCovid;
