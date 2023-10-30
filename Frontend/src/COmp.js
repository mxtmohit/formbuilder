const COmp = () => {
  const ar = [
    { date: "2023-09-19", data: "today data" },
    { date: "2023-09-19", data: "today data" },
    { date: "2023-09-17", data: "today data" },
    { date: "2023-09-14", data: "prev 7 data" },
    { date: "2023-09-12", data: "prev 7 data" },
    { date: "2023-09-4", data: "prev 30 data" },
    { date: "2023-08-21", data: "prev 30 data" },
    { date: "2023-09-17", data: "today date" },
    { date: "2023-09-17", data: "today date" },
  ];

  ar.sort((a,v)=>new Date(v.date) - new Date(a.date))

  

  const currentDate = new Date();

 
  let istitletoday = true;
  let istitle7 = true;
  let istitle30 = true;

  let comp1 = false;
  let comp30 = false;
  let comp7 = false;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {ar.map((item) => {
        const days =
          Math.floor(currentDate - new Date(item.date)) / (1000 * 60 * 60 * 24);

        if (days < 1 && days > 0) {
          comp1 = true;
          comp30 = false;
          comp7 = false;
        } else if (days < 8 && days > 1) {
          comp1 = false;
          comp30 = false;
          comp7 = true;
        } else if (days < 38 && days > 8) {
          comp1 = false;
          comp30 = true;
          comp7 = false;
        }
    
        return (
          // <>
          //   {days < 1 && days > 0 && (
          //     <>
          //       <div styles={{ backgroundColor: "red" }}>
          //         <h3>Today</h3>
          //       </div>
          //       <div>{item.data}</div>
          //     </>
          //   )}
          //   {days < 8 && days > 1 && (
          //     <>
          //       <div styles={{ backgroundColor: "red" }}>
          //         <h3>Prev 7</h3>
          //       </div>
          //       <div>{item.data}</div>
          //     </>
          //   )}
          //   {days < 38 && days > 8 && (
          //     <>
          //       <div styles={{ backgroundColor: "red" }}>
          //         <h3>Prev 30</h3>
          //       </div>
          //       <div>{item.data}</div>
          //     </>
          //   )}
          // </>

          <>
            {comp1 ? (
              <>
                {comp1 && istitletoday && (
                  <>
                    <div style={{ backgroundColor: "red" }}>
                      <h3>Today</h3>
                    </div>
                  </>
                )}

                <>{days < 1 && days > 0 && <div>{item.data}</div>} </>
                <>{(istitletoday = false)}</>
              </>
            ) : comp7 ? (
              <>
                {comp7 && istitle7 && (
                  <>
                    <div style={{ backgroundColor: "red" }}>
                      <h3>Prev 7</h3>
                    </div>
                  </>
                )}

                <>{<div>{item.data}</div>} </>
                <>{(istitle7 = false)}</>
              </>
            ) : (
              <>
                {comp30 && istitle30 && (
                  <>
                    <div style={{ backgroundColor: "red" }}>
                      <h3>Prev 30</h3>
                    </div>
                  </>
                )}

                <>{<div>{item.data}</div>} </>
                <>{(istitle30 = false)}</>
              </>
            )}
          </>
        );
      })}
    </div>
  );
};

export default COmp;

