// pages/home/toorder/toorder.js
var app = getApp();
Page({
  /**
   * 页面的初始数据 
   */
  data: {
    // id: 0,
    // ida:0,
    namea: "", nameb: "", namec: "", named: "", namee: "", namef: "", nameg: "", nameh: "", namei: "", namej: "",
    item: "",
    ljgmx: "", ljgmx1: "", ljgmx2: "", ljgmx3: "",// ljgmx4: "", 
    // ljgmx5: "", ljgmx6: "", ljgmx7: "", ljgmx8: "",
    ljgmxa: "", ljgmxb: "", ljgmxc: "", ljgmxd: "", ljgmxe: "",
    // ljgmxf: "", ljgmxg: "", ljgmxh: "", ljgmxi: "",
    tipsshow: "", tipsshow1: "", tipsshow2: "", tipsshow3: "", tipsshow4: "", tipsshow5: "",
    tipsshowa: "", tipsshowb1: "", tipsshowc2: "", tipsshowd3: "", tipsshowe4: "", tipsshowf5: "",
    abc: "none",
    // selected: true,
    // selected1: false,
  },
  //男装点击
  click: function (e) {
    var aba = e.target.dataset.aba;
    console.log(aba)
    this.setData({
      aba: aba,
      abc: "block"
    })
  },
  click1: function (e) {
    var abb = e.target.dataset.abb;
    console.log(abb)
    this.setData({
      abb: abb,
    })
  },
  click2: function (e) {
    var abc = e.target.dataset.abc;
    console.log(abc)
    this.setData({
      abc: abc,
    })
  },
  click3: function (o) {
    var abd = o.target.dataset.abd;
    console.log(abd)
    this.setData({
      abd: abd,
    })
  },
  click4: function (o) {
    var abe = o.target.dataset.abe;
    console.log(abe)
    this.setData({
      abe: abe,
    })
  },
  click5: function (o) {
    var abf = o.target.dataset.abf;
    console.log(ids5)
    this.setData({
      abf: abf,
    })
  },
  click6: function (o) {
    var abg = o.target.dataset.abg;
    console.log(abg)
    this.setData({
      abg: abg,
    })
  },

  //女装点击
  // clicka: function (e) {
  //   var ids = e.target.dataset.ids;
  //   console.log(ids)
  //   this.setData({
  //     ids: ids,
  //   })
  // },
  // clickb: function (e) {
  //   var ids1 = e.target.dataset.ids1;
  //   console.log(ids1)
  //   this.setData({
  //     ids1: ids1,
  //   })
  // },
  // clickc: function (e) {
  //   var ids2 = e.target.dataset.ids2;
  //   console.log(ids2)
  //   this.setData({
  //     ids2: ids2,
  //   })
  // },
  // clickd: function (o) {
  //   var ids3 = o.target.dataset.ids3;
  //   console.log(ids3)
  //   this.setData({
  //     ids3: ids3,
  //   })
  // },
  // clicke: function (o) {
  //   var ids4 = o.target.dataset.ids4;
  //   console.log(ids4)
  //   this.setData({
  //     ids4: ids4,
  //   }) 
  // },
  // clickf: function (o) {
  //   var ids5 = o.target.dataset.ids5;
  //   console.log(ids5)
  //   this.setData({
  //     ids5: ids5,
  //   })
  // },
  // clickg: function (o) {
  //   var ids6 = o.target.dataset.ids6;
  //   console.log(ids6)
  //   this.setData({
  //     ids6: ids6,
  //   })
  // },

  //获取input
  asdfrewq: function (e) {
    var ida = e.currentTarget.dataset.id;
    console.log(ida)
    this.setData({
      id: ida
    })
  },
  namea: function (e) {
    this.setData({
      namea: e.detail.value
    })
  },
  nameb: function (e) {
    this.setData({
      nameb: e.detail.value
    })
  },
  namec: function (e) {
    this.setData({
      namec: e.detail.value
    })
  },
  named: function (e) {
    this.setData({
      named: e.detail.value
    })
  },
  namee: function (e) {
    this.setData({
      namee: e.detail.value
    })
  },
  namef: function (e) {
    this.setData({
      namef: e.detail.value
    })
  },
  nameg: function (e) {
    this.setData({
      nameg: e.detail.value
    })
  },
  nameh: function (e) {
    this.setData({
      nameh: e.detail.value
    })
  },
  namei: function (e) {
    this.setData({
      namei: e.detail.value
    })
  },
  namej: function (e) {
    this.setData({
      namej: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var member_id = wx.getStorageSync('memberId');
    console.log(member_id)
    //男
    app.apiRequest('/custom/getCoutomTypes', 'GET', {
      'sex': 2
    }, function (res) {
      console.log("这种")
      console.log(res.data)
      // var asa = res.data[0].key.val.length
      // var asb = res.data[1].key.val.length
      // var asc = res.data[2].key.val.length
      // var asd = res.data[3].key.val.length
      // var ase = res.data[4].key.val.length
      // var asf = res.data[5].key.val.length
      // console.log(res.data[1])
      // if (asa !== 0) {that.setData({ ljgmxa: res.data[0] });}else {that.setData({tipsshow: "none"})};
      // if (asa !== 0) { that.setData({ ljgmxa: res.data[0] }); } else { that.setData({ tipsshow: "none" }) }; 
      // if (asa !== 0) { that.setData({ ljgmxa: res.data[0] }); } else { that.setData({ tipsshow: "none" }) };
      // if (asa !== 0) { that.setData({ ljgmxa: res.data[0] }); } else { that.setData({ tipsshow: "none" }) };
      // if (asa !== 0) { that.setData({ ljgmxa: res.data[0] }); } else { that.setData({ tipsshow: "none" }) };
      // if (asa !== 0) { that.setData({ ljgmxa: res.data[0] }); } else { that.setData({ tipsshow: "none" }) };
      // if (asa !== 0) { that.setData({ ljgmxa: res.data[0] }); } else { that.setData({ tipsshow: "none" }) };
      that.setData({ ljgmx: res.data[0] });
      that.setData({ ljgmx1: res.data[1] });
      that.setData({ ljgmx2: res.data[2] });
      that.setData({ ljgmx3: res.data[3] });
      that.setData({
        aba: res.data["0"].val["0"].id,
        abb: res.data[1].val["0"].id,
        abc: res.data[2].val["0"].id,
        abd: res.data[3].val["0"].id
      })
      // that.setData({ ljgmx4: res.data[4] });
      // that.setData({ ljgmx5: res.data[5] });
      // that.setData({
      //   ljgmx6: res.data[6]
      // })
    });
   
    //女
    // app.apiRequest('/custom/getCoutomTypes', 'GET', {
    // 'sex':1
    // },function (resm) {
    // console.log(resm.data)
    // console.log(res.data[1])
    // var asa = resm.data[0].key.val.length
    // var asb = resm.data[1].key.val.length
    // var asc = resm.data[2].key.val.length
    // var asd = resm.data[3].key.val.length
    // var ase = resm.data[4].key.val.length
    // var asf = resm.data[5].key.val.length

    // if (asa !== 0) {that.setData({ ljgmxa: resm.data[0] });}else {that.setData({tipsshow: "none"})};
    // if (asa !== 0) { that.setData({ ljgmxa: resm.data[0] }); } else { that.setData({ tipsshow: "none" }) }; 
    // if (asa !== 0) { that.setData({ ljgmxa: resm.data[0] }); } else { that.setData({ tipsshow: "none" }) };
    // if (asa !== 0) { that.setData({ ljgmxa: resm.data[0] }); } else { that.setData({ tipsshow: "none" }) };
    // if (asa !== 0) { that.setData({ ljgmxa: resm.data[0] }); } else { that.setData({ tipsshow: "none" }) };
    // if (asa !== 0) { that.setData({ ljgmxa: resm.data[0] }); } else { that.setData({ tipsshow: "none" }) };
    // if (asa !== 0) { that.setData({ ljgmxa: resm.data[0] }); } else { that.setData({ tipsshow: "none" }) };
    // that.setData({ ljgmxb: resm.data[1] });
    // that.setData({ ljgmxc: resm.data[2] });
    // that.setData({ ljgmxd: resm.data[3] });
    // that.setData({ ljgmxe: resm.data[4] });
    // that.setData({ ljgmxf: resm.data[5] });
    // that.setData({
    //   ljgmx6: res.data[6]
    // })
    // });
    app.apiRequest('/custom/newCustom', 'GET', {
      'memberId': member_id,
      'state': 1
    }, function (res) {
      var mysize = wx.getStorageSync('updataMySize')
      console.log("ssssss")
      console.log(res)
     // console.log(mysize.sex)
      if(res.data=="false"){
        return;
      }
      var asd = mysize.sex
      if (asd == 1) {
        var asdasd = "男"
      }
      if (asd == 2) {
        var asdasd = "女"
      }
      that.setData({
        sex: asdasd,
        id:mysize.id,//customid
        nick_name: mysize.name,
        height: mysize.height,
        weight: mysize.weight,
        breadthing: mysize.s_neck_girth, //领围
        long_legs: mysize.breadth, //机器扫描肩宽
        arm_length: mysize.arm_length, //臂长
        hip_circumference: mysize.chest, //胸围
        waist_circumference: mysize.waist_circumference, //腰围
        knee_circumference: mysize.hip_circumference, //臀围
        // long_legs: mysize.long_legs, //肩宽
        //  这里报错   下面4行被我注释掉
        // s_buttock_height: mysize.s_buttock_height, //臀高
        // s_cross: mysize.s_cross,  //过肩横颈
        // s_cross_height: mysize.s_cross_height, //颈椎点高
        // s_neck_girth: mysize.s_neck_height,//颈围
        // s_waist_height: mysize.s_waist_height,  //腰高
        namea: mysize.name,
        nameb: mysize.height,
        namec: mysize.weight, 
        named: mysize.s_neck_girth,
        namee: mysize.arm_length,
        namef: mysize.chest,
        nameg: mysize.waist_circumference,
        nameh: mysize.hip_circumference,
        namei: mysize.breadth,
        namej: asdasd
      })
    });
  },
  submit: function (e) {

    // wx.showToast({
    //   title: '正在内测，马上放出',
    //   icon: 'none',
    //   duration: 2000
    // })
    //提交量体信息
    // var ida = that.data.ida
    // var idb = that.data.idb
    var that = this
    //男性点击信息提取
    var num = that.data.num //
    var aba = that.data.aba
    var abb = that.data.abb
    var abc = that.data.abc
    var abd = that.data.abd
    var abe = that.data.abe
    // var abf = that.data.abf
    // var abg = that.data.abg
    // var abh = that.data.abh
    let skuu = []
    if (aba !== undefined) { skuu.push(aba); };
    if (abb !== undefined) { skuu.push(abb); };
    if (abc !== undefined) { skuu.push(abc); };
    if (abd !== undefined) { skuu.push(abd); };
    if (abe !== undefined) { skuu.push(abe); };
    // if (abf !== undefined) {skuu.push(abf);};
    // if (abg !== undefined) {skuu.push(abg);};
    // if (abh !== undefined) {skuu.push(abh);};
    console.log(skuu)

    //点击信息提取结束

    var ids = that.data.id
    console.log("ids")
    console.log(ids)
    // 手动输入信息提取
    var namea = that.data.namea //
    console.log(namea)
    var height = that.data.nameb  //身高
    console.log(height)
    var weight = that.data.namec // 体重
    console.log(weight)
    var a = that.data.namej // 性别
    if (a == "男") {
      var sex = 1
    } else {
      var sex = 2
    }
    // console.log(namec)
    var breadth = that.data.named // 颈围
    console.log(breadth)
    var arm_length = that.data.namee // 臂长
    console.log(arm_length)
    var chest = that.data.namef // 胸围
    console.log(chest)
    var waist_circumference = that.data.nameg //腰围
    console.log(waist_circumference)
    var hip_circumference = that.data.nameh //臀围
    console.log(hip_circumference)
    var long_legs = that.data.namei //肩宽
    console.log(long_legs)
    // let memCustom ={
    //   'name':namea,
    //   'height':height,
    //   'weight': weight,
    //   'sex':sex,
    //   'breadthing': breadth,
    //   'arm_length': arm_length,
    //   'waist_circumference': waist_circumference,
    //   'hip_circumference': hip_circumference,
    //   'long_legs': long_legs
    // }
    // console.log(memCustom)
    var member_id = wx.getStorageSync('memberId');  //用户id
    app.apiRequest('/custom/updateMemberCustom', 'POST', {
      'ids':ids,
      'name': namea,
      'height': height,
      'weight': weight,
      'chest': chest,
      'sex': sex,
      's_neck_girth': breadth,
      'armLength': arm_length,
      'waistCircumference': waist_circumference,
      'hipCircumference': hip_circumference,
      'breadth': long_legs,
      'memCustom': skuu + "",
      'state': 1
    }, function (res) {
      console.log(res.code)
      if (res.code == 200) {
        setTimeout(function () {
        wx.showToast({
          title: '修改成功',
          icon: 'succes',
          duration: 2000
        })
        },1000)
        
        wx.setStorageSync('selectCustom', '')
        wx.redirectTo({
          url: '/pages/mine/size/mysize/mysize',
        })
      } else {
        setTimeout(function () {
        wx.showToast({
          title: '修改失败',
          icon: 'loading',
          duration: 500
        })
        },1000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})