const SideBar = ({ data }) => {
  console.log('SIDEBAR DATA:', data);

  return (
    <div className="side-bar">
      <img src="/static/img/portrait-placeholder.jpg" alt="sidebar-portrait" />
      <div className="side-bar-wrap">
        <h4 className="side-bar-title text-center">the author</h4>
        <div className="side-bar-content">
          {data
            ? data.content
                .split('\n')
                .map((paragraph) => (
                  <p key={paragraph.slice(0, 5)}>{paragraph}</p>
                ))
            : null}
          {/* <p>
            我是國文系畢業的，之後有當老師一陣子，發現不適合，現在看看有沒有更好的路。
          </p>
          <p>平常喜歡IG跟拍照。</p>
          <p>目前我的工作是一直要加班的秘書, 但家裡有可愛的狗陪著所以還好。</p> */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
