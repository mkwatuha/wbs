	Ext.require([
    'Ext.form.*',
    'Ext.Img',
    'Ext.tip.QuickTipManager'
]);


function admin_activitystatusForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_activitystatus();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin activitystatus ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_activitystatus'
			 },
			 {xtype:'hidden',
             name:'activitystatus_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'activitystatus_name',
            fieldLabel: 'Activitystatus Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'activitystatus_status',
            fieldLabel: 'Activitystatus Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_activitystatus();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_activitystatusinfo(formPanel,rid);
}

});



}//launchForm()


function admin_adminuserForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_person', {
    extend: 'Ext.data.Model',
	fields:['person_id','person_name']
	});

var admin_persondata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_person',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_person',
        reader: {
            type: 'json'
        }
    }
});

admin_persondata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_adminuser();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin adminuser ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_adminuser'
			 },
			 {xtype:'hidden',
             name:'adminuser_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'person_id',
	forceSelection:true,
    fieldLabel: 'Person Id ',
    store: admin_persondata,
    queryMode: 'local',
    displayField: 'person_name',
    valueField: 'person_id'
	},{
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'Username ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'password',
            fieldLabel: 'Password ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'status',
            fieldLabel: 'Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_adminuser();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_adminuserinfo(formPanel,rid);
}

});



}//launchForm()


function admin_aggrigateForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_aggrigate();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin aggrigate ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_aggrigate'
			 },
			 {xtype:'hidden',
             name:'aggrigate_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'aggrigate_name',
            fieldLabel: 'Aggrigate Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'aggrigate_description',
            fieldLabel: 'Aggrigate Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_aggrigate();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_aggrigateinfo(formPanel,rid);
}

});



}//launchForm()


function admin_alertForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_alert();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin alert ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_alert'
			 },
			 {xtype:'hidden',
             name:'alert_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'alert_name',
            fieldLabel: 'Alert Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'is_active',
            fieldLabel: 'Is Active ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'alert_description',
            fieldLabel: 'Alert Description ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'alert_date',
            fieldLabel: 'Alert Date ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_alert();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_alertinfo(formPanel,rid);
}

});



}//launchForm()


function admin_autofillForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_autofill();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin autofill ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_autofill'
			 },
			 {xtype:'hidden',
             name:'autofill_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'autofill_name',
            fieldLabel: 'Autofill Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'primary_tablelist',
            fieldLabel: 'Primary Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'is_visible',
            fieldLabel: 'Is Visible ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'regex',
            fieldLabel: 'Regex ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'editable',
            fieldLabel: 'Editable ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'min_len',
            fieldLabel: 'Min Len ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'max_len',
            fieldLabel: 'Max Len ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'caption',
            fieldLabel: 'Caption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'fieldname',
            fieldLabel: 'Fieldname ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'prefix',
            fieldLabel: 'Prefix ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'surfix',
            fieldLabel: 'Surfix ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'digit_number',
            fieldLabel: 'Digit Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'fill_combination',
            fieldLabel: 'Fill Combination ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'inf',
            fieldLabel: 'Inf ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_autofill();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_autofillinfo(formPanel,rid);
}

});



}//launchForm()


function admin_companyForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_company();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin company ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_company'
			 },
			 {xtype:'hidden',
             name:'company_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'company_name',
            fieldLabel: 'Company Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'pin_number',
            fieldLabel: 'Pin Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'vat_number',
            fieldLabel: 'Vat Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'incorp_date',
            fieldLabel: 'Incorp Date ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'building',
            fieldLabel: 'Building ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'location_description',
            fieldLabel: 'Location Description ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'street',
            fieldLabel: 'Street ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'mobile',
            fieldLabel: 'Mobile ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'tel',
            fieldLabel: 'Tel ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'fax',
            fieldLabel: 'Fax ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'postal_address',
            fieldLabel: 'Postal Address ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'postal_code',
            fieldLabel: 'Postal Code ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'town',
            fieldLabel: 'Town ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'email_address2',
            fieldLabel: 'Email Address2 ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'email_address',
            fieldLabel: 'Email Address ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'website',
            fieldLabel: 'Website ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'comment',
            fieldLabel: 'Comment ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_company();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_companyinfo(formPanel,rid);
}

});



}//launchForm()


function admin_companycontactForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_company', {
    extend: 'Ext.data.Model',
	fields:['company_id','company_name']
	});

var admin_companydata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_company',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_company',
        reader: {
            type: 'json'
        }
    }
});

admin_companydata.load();


Ext.define('cmbAdmin_person', {
    extend: 'Ext.data.Model',
	fields:['person_id','person_name']
	});

var admin_persondata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_person',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_person',
        reader: {
            type: 'json'
        }
    }
});

admin_persondata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_companycontact();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin companycontact ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_companycontact'
			 },
			 {xtype:'hidden',
             name:'companycontact_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'company_id',
	forceSelection:true,
    fieldLabel: 'Company Id ',
    store: admin_companydata,
    queryMode: 'local',
    displayField: 'company_name',
    valueField: 'company_id'
	},
   {
    xtype: 'combobox',
	name:'person_id',
	forceSelection:true,
    fieldLabel: 'Person Id ',
    store: admin_persondata,
    queryMode: 'local',
    displayField: 'person_name',
    valueField: 'person_id'
	},{
            xtype: 'textfield',
            name: 'preferred',
            fieldLabel: 'Preferred ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'status',
            fieldLabel: 'Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_companycontact();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_companycontactinfo(formPanel,rid);
}

});



}//launchForm()


function admin_companydeptForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_company', {
    extend: 'Ext.data.Model',
	fields:['company_id','company_name']
	});

var admin_companydata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_company',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_company',
        reader: {
            type: 'json'
        }
    }
});

admin_companydata.load();


Ext.define('cmbAdmin_dept', {
    extend: 'Ext.data.Model',
	fields:['dept_id','dept_name']
	});

var admin_deptdata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_dept',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_dept',
        reader: {
            type: 'json'
        }
    }
});

admin_deptdata.load();


Ext.define('cmb', {
    extend: 'Ext.data.Model',
	fields:['_id','_name']
	});

var data = Ext.create('Ext.data.Store', {
    model: 'cmb',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=',
        reader: {
            type: 'json'
        }
    }
});

data.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_companydept();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin companydept ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_companydept'
			 },
			 {xtype:'hidden',
             name:'companydept_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'company_id',
	forceSelection:true,
    fieldLabel: 'Company Id ',
    store: admin_companydata,
    queryMode: 'local',
    displayField: 'company_name',
    valueField: 'company_id'
	},
   {
    xtype: 'combobox',
	name:'dept_id',
	forceSelection:true,
    fieldLabel: 'Dept Id ',
    store: admin_deptdata,
    queryMode: 'local',
    displayField: 'dept_name',
    valueField: 'dept_id'
	},
   {
    xtype: 'combobox',
	name:'location_id',
	forceSelection:true,
    fieldLabel: 'Location Id ',
    store: data,
    queryMode: 'local',
    displayField: '_name',
    valueField: '_id'
	},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'Status',
            fieldLabel: 'Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_companydept();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_companydeptinfo(formPanel,rid);
}

});



}//launchForm()


function admin_companydeptrlnphpForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_dept', {
    extend: 'Ext.data.Model',
	fields:['dept_id','dept_name']
	});

var admin_deptdata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_dept',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_dept',
        reader: {
            type: 'json'
        }
    }
});

admin_deptdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_companydeptrlnphp();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin companydeptrlnphp ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_companydeptrlnphp'
			 },
			 {xtype:'hidden',
             name:'companydeptrlnphp_id',
			 value:''
			 },{
            xtype: 'numberfield',
            name: 'parent',
            fieldLabel: 'Parent ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'dept_id',
	forceSelection:true,
    fieldLabel: 'Dept Id ',
    store: admin_deptdata,
    queryMode: 'local',
    displayField: 'dept_name',
    valueField: 'dept_id'
	},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'Status',
            fieldLabel: 'Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_companydeptrlnphp();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_companydeptrlnphpinfo(formPanel,rid);
}

});



}//launchForm()


function admin_compstructtreeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_company', {
    extend: 'Ext.data.Model',
	fields:['company_id','company_name']
	});

var admin_companydata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_company',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_company',
        reader: {
            type: 'json'
        }
    }
});

admin_companydata.load();


Ext.define('cmb', {
    extend: 'Ext.data.Model',
	fields:['_id','_name']
	});

var data = Ext.create('Ext.data.Store', {
    model: 'cmb',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=',
        reader: {
            type: 'json'
        }
    }
});

data.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_compstructtree();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin compstructtree ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_compstructtree'
			 },
			 {xtype:'hidden',
             name:'compstructtree_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'company_id',
	forceSelection:true,
    fieldLabel: 'Company Id ',
    store: admin_companydata,
    queryMode: 'local',
    displayField: 'company_name',
    valueField: 'company_id'
	},{
            xtype: 'textfield',
            name: 'dept_id',
            fieldLabel: 'Dept Id ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'location_id',
	forceSelection:true,
    fieldLabel: 'Location Id ',
    store: data,
    queryMode: 'local',
    displayField: '_name',
    valueField: '_id'
	},{
            xtype: 'textfield',
            name: 'compstructtree_name',
            fieldLabel: 'Compstructtree Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_compstructtree();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_compstructtreeinfo(formPanel,rid);
}

});



}//launchForm()


function admin_contactForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_contact();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin contact ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_contact'
			 },
			 {xtype:'hidden',
             name:'contact_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'contact_name',
            fieldLabel: 'Contact Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'postal_address',
            fieldLabel: 'Postal Address ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'location_description',
            fieldLabel: 'Location Description ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'street',
            fieldLabel: 'Street ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'mobile',
            fieldLabel: 'Mobile ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'tel',
            fieldLabel: 'Tel ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'fax',
            fieldLabel: 'Fax ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'email_address2',
            fieldLabel: 'Email Address2 ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'postal_code',
            fieldLabel: 'Postal Code ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'town',
            fieldLabel: 'Town ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'building',
            fieldLabel: 'Building ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'email_address',
            fieldLabel: 'Email Address ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'website',
            fieldLabel: 'Website ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'comment',
            fieldLabel: 'Comment ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_contact();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_contactinfo(formPanel,rid);
}

});



}//launchForm()


function admin_contactdetailsForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_contactdetails();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin contactdetails ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_contactdetails'
			 },
			 {xtype:'hidden',
             name:'contactdetails_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'syowner',
            fieldLabel: 'Syowner ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'syownerid',
            fieldLabel: 'Syownerid ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'email_address',
            fieldLabel: 'Email Address ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'mobile_number',
            fieldLabel: 'Mobile Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'postal_address',
            fieldLabel: 'Postal Address ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'physical_address',
            fieldLabel: 'Physical Address ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'fax',
            fieldLabel: 'Fax ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'telephone',
            fieldLabel: 'Telephone ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'preferred',
            fieldLabel: 'Preferred ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_contactdetails();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_contactdetailsinfo(formPanel,rid);
}

});



}//launchForm()


function admin_controllerForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_controller();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin controller ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_controller'
			 },
			 {xtype:'hidden',
             name:'controller_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'tablename',
            fieldLabel: 'Tablename ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'groupfolder',
            fieldLabel: 'Groupfolder ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'displaygroup',
            fieldLabel: 'Displaygroup ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'displaysubgroup',
            fieldLabel: 'Displaysubgroup ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'infsubgroup',
            fieldLabel: 'Infsubgroup ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'showgroup',
            fieldLabel: 'Showgroup ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'infgroup',
            fieldLabel: 'Infgroup ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'showgroupposition',
            fieldLabel: 'Showgroupposition ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'defaultgrouptable',
            fieldLabel: 'Defaultgrouptable ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'tablecaption',
            fieldLabel: 'Tablecaption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'fieldname',
            fieldLabel: 'Fieldname ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'gridwidth',
            fieldLabel: 'Gridwidth ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'fieldcaption',
            fieldLabel: 'Fieldcaption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'detailsvisiblepdf',
            fieldLabel: 'Detailsvisiblepdf ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'pdfvisible',
            fieldLabel: 'Pdfvisible ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'position',
            fieldLabel: 'Position ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'menuposition',
            fieldLabel: 'Menuposition ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'colnwidth',
            fieldLabel: 'Colnwidth ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'dataformat',
            fieldLabel: 'Dataformat ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'dispaytype',
            fieldLabel: 'Dispaytype ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'required',
            fieldLabel: 'Required ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'caption_position',
            fieldLabel: 'Caption Position ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'control_position',
            fieldLabel: 'Control Position ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'infwidth',
            fieldLabel: 'Infwidth ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'infhieght',
            fieldLabel: 'Infhieght ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'infpos',
            fieldLabel: 'Infpos ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'infshow',
            fieldLabel: 'Infshow ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'displaysize',
            fieldLabel: 'Displaysize ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'primarykeyidentifier',
            fieldLabel: 'Primarykeyidentifier ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'isautoincrement',
            fieldLabel: 'Isautoincrement ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'accessrights',
            fieldLabel: 'Accessrights ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_controller();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_controllerinfo(formPanel,rid);
}

});



}//launchForm()


function admin_customForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_custom();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin custom ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_custom'
			 },
			 {xtype:'hidden',
             name:'custom_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'tablename',
            fieldLabel: 'Tablename ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'fieldname',
            fieldLabel: 'Fieldname ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'stored_value',
            fieldLabel: 'Stored Value ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'display_caption',
            fieldLabel: 'Display Caption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'displaytype',
            fieldLabel: 'Displaytype ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_custom();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_custominfo(formPanel,rid);
}

});



}//launchForm()


function admin_deptForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmb', {
    extend: 'Ext.data.Model',
	fields:['_id','_name']
	});

var data = Ext.create('Ext.data.Store', {
    model: 'cmb',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=',
        reader: {
            type: 'json'
        }
    }
});

data.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_dept();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin dept ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_dept'
			 },
			 {xtype:'hidden',
             name:'dept_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'dept_name',
            fieldLabel: 'Dept Name ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'location_id',
	forceSelection:true,
    fieldLabel: 'Location Id ',
    store: data,
    queryMode: 'local',
    displayField: '_name',
    valueField: '_id'
	},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'effective_dt',
            fieldLabel: 'Effective Dt ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_dept();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_deptinfo(formPanel,rid);
}

});



}//launchForm()


function admin_displaytypeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_displaytype();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin displaytype ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_displaytype'
			 },
			 {xtype:'hidden',
             name:'displaytype_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'displaytype_name',
            fieldLabel: 'Displaytype Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_displaytype();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_displaytypeinfo(formPanel,rid);
}

});



}//launchForm()


function admin_docsForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_docs();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin docs ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_docs'
			 },
			 {xtype:'hidden',
             name:'docs_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'docs_name',
            fieldLabel: 'Docs Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'doc_owner',
            fieldLabel: 'Doc Owner ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_docs();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_docsinfo(formPanel,rid);
}

});



}//launchForm()


function admin_generaviewForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbDesigner_sview', {
    extend: 'Ext.data.Model',
	fields:['sview_id','sview_name']
	});

var designer_sviewdata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_sview',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_sview',
        reader: {
            type: 'json'
        }
    }
});

designer_sviewdata.load();


Ext.define('cmbAdmin_role', {
    extend: 'Ext.data.Model',
	fields:['role_id','role_name']
	});

var admin_roledata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_role',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_role',
        reader: {
            type: 'json'
        }
    }
});

admin_roledata.load();


Ext.define('cmbDesigner_tblgroup', {
    extend: 'Ext.data.Model',
	fields:['tblgroup_id','tblgroup_name']
	});

var designer_tblgroupdata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_tblgroup',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_tblgroup',
        reader: {
            type: 'json'
        }
    }
});

designer_tblgroupdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_generaview();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin generaview ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_generaview'
			 },
			 {xtype:'hidden',
             name:'generaview_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'sview_id',
	forceSelection:true,
    fieldLabel: 'Sview Id ',
    store: designer_sviewdata,
    queryMode: 'local',
    displayField: 'sview_name',
    valueField: 'sview_id'
	},
   {
    xtype: 'combobox',
	name:'role_id',
	forceSelection:true,
    fieldLabel: 'Role Id ',
    store: admin_roledata,
    queryMode: 'local',
    displayField: 'role_name',
    valueField: 'role_id'
	},
   {
    xtype: 'combobox',
	name:'tblgroup_id',
	forceSelection:true,
    fieldLabel: 'Tblgroup Id ',
    store: designer_tblgroupdata,
    queryMode: 'local',
    displayField: 'tblgroup_name',
    valueField: 'tblgroup_id'
	},{
            xtype: 'textfield',
            name: 'menu_caption',
            fieldLabel: 'Menu Caption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'status',
            fieldLabel: 'Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_generaview();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_generaviewinfo(formPanel,rid);
}

});



}//launchForm()


function admin_groupcategoryForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_groupcategory();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin groupcategory ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_groupcategory'
			 },
			 {xtype:'hidden',
             name:'groupcategory_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'groupcategory_name',
            fieldLabel: 'Groupcategory Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_groupcategory();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_groupcategoryinfo(formPanel,rid);
}

});



}//launchForm()


function admin_minmaxForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_minmax();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin minmax ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_minmax'
			 },
			 {xtype:'hidden',
             name:'minmax_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'tablename',
            fieldLabel: 'Tablename ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'fieldname',
            fieldLabel: 'Fieldname ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'minvalue',
            fieldLabel: 'Minvalue ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'maxvalue',
            fieldLabel: 'Maxvalue ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'currentvalue',
            fieldLabel: 'Currentvalue ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'notificationCreteria',
            fieldLabel: 'NotificationCreteria ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_minmax();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_minmaxinfo(formPanel,rid);
}

});



}//launchForm()


function admin_monthForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_month();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin month ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_month'
			 },
			 {xtype:'hidden',
             name:'month_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'month_name',
            fieldLabel: 'Month Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_month();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_monthinfo(formPanel,rid);
}

});



}//launchForm()


function admin_pcategoryattributeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_pcategoryattribute();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin pcategoryattribute ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_pcategoryattribute'
			 },
			 {xtype:'hidden',
             name:'pcategoryattribute_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'pcategoryattribute_name',
            fieldLabel: 'Pcategoryattribute Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_pcategoryattribute();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_pcategoryattributeinfo(formPanel,rid);
}

});



}//launchForm()


function admin_personForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_person();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin person ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_person'
			 },
			 {xtype:'hidden',
             name:'person_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'person_name',
            fieldLabel: 'Employee Number',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'first_name',
            fieldLabel: 'First Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'middle_name',
            fieldLabel: 'Middle Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'last_name',
            fieldLabel: 'Last Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'idorpassport_number',
            fieldLabel: 'Idorpassport Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'dob',
            fieldLabel: 'Dob ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'pin',
            fieldLabel: 'Pin ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'gender',
            fieldLabel: 'Gender ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'status',
            fieldLabel: 'Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_person();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_personinfo(formPanel,rid);
}

});



}//launchForm()


function admin_personattributeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_pcategoryattribute', {
    extend: 'Ext.data.Model',
	fields:['pcategoryattribute_id','pcategoryattribute_name']
	});

var admin_pcategoryattributedata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_pcategoryattribute',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_pcategoryattribute',
        reader: {
            type: 'json'
        }
    }
});

admin_pcategoryattributedata.load();


Ext.define('cmbAdmin_person', {
    extend: 'Ext.data.Model',
	fields:['person_id','person_name']
	});

var admin_persondata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_person',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_person',
        reader: {
            type: 'json'
        }
    }
});

admin_persondata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_personattribute();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin personattribute ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_personattribute'
			 },
			 {xtype:'hidden',
             name:'personattribute_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'pcategoryattribute_id',
	forceSelection:true,
    fieldLabel: 'Pcategoryattribute Id ',
    store: admin_pcategoryattributedata,
    queryMode: 'local',
    displayField: 'pcategoryattribute_name',
    valueField: 'pcategoryattribute_id'
	},{
            xtype: 'textfield',
            name: 'attribute_value',
            fieldLabel: 'Attribute Value ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'person_id',
	forceSelection:true,
    fieldLabel: 'Person Id ',
    store: admin_persondata,
    queryMode: 'local',
    displayField: 'person_name',
    valueField: 'person_id'
	}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_personattribute();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_personattributeinfo(formPanel,rid);
}

});



}//launchForm()


function admin_personcategoryattributeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_pcategoryattribute', {
    extend: 'Ext.data.Model',
	fields:['pcategoryattribute_id','pcategoryattribute_name']
	});

var admin_pcategoryattributedata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_pcategoryattribute',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_pcategoryattribute',
        reader: {
            type: 'json'
        }
    }
});

admin_pcategoryattributedata.load();


Ext.define('cmbAdmin_personttypecategory', {
    extend: 'Ext.data.Model',
	fields:['personttypecategory_id','personttypecategory_name']
	});

var admin_personttypecategorydata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_personttypecategory',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_personttypecategory',
        reader: {
            type: 'json'
        }
    }
});

admin_personttypecategorydata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_personcategoryattribute();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin personcategoryattribute ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_personcategoryattribute'
			 },
			 {xtype:'hidden',
             name:'personcategoryattribute_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'pcategoryattribute_id',
	forceSelection:true,
    fieldLabel: 'Pcategoryattribute Id ',
    store: admin_pcategoryattributedata,
    queryMode: 'local',
    displayField: 'pcategoryattribute_name',
    valueField: 'pcategoryattribute_id'
	},
   {
    xtype: 'combobox',
	name:'personttypecategory_id',
	forceSelection:true,
    fieldLabel: 'Personttypecategory Id ',
    store: admin_personttypecategorydata,
    queryMode: 'local',
    displayField: 'personttypecategory_name',
    valueField: 'personttypecategory_id'
	}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_personcategoryattribute();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_personcategoryattributeinfo(formPanel,rid);
}

});



}//launchForm()


function admin_persondeptForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_dept', {
    extend: 'Ext.data.Model',
	fields:['dept_id','dept_name']
	});

var admin_deptdata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_dept',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_dept',
        reader: {
            type: 'json'
        }
    }
});

admin_deptdata.load();


Ext.define('cmbAdmin_person', {
    extend: 'Ext.data.Model',
	fields:['person_id','person_name']
	});

var admin_persondata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_person',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_person',
        reader: {
            type: 'json'
        }
    }
});

admin_persondata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_persondept();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin persondept ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_persondept'
			 },
			 {xtype:'hidden',
             name:'persondept_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'dept_id',
	forceSelection:true,
    fieldLabel: 'Dept Id ',
    store: admin_deptdata,
    queryMode: 'local',
    displayField: 'dept_name',
    valueField: 'dept_id'
	},
   {
    xtype: 'combobox',
	name:'person_id',
	forceSelection:true,
    fieldLabel: 'Person Id ',
    store: admin_persondata,
    queryMode: 'local',
    displayField: 'person_name',
    valueField: 'person_id'
	},{
            xtype: 'datefield',
            name: 'start_dt',
            fieldLabel: 'Start Dt ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'end_dt',
            fieldLabel: 'End Dt ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'is_active',
            fieldLabel: 'Is Active ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'comments',
            fieldLabel: 'Comments ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_persondept();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_persondeptinfo(formPanel,rid);
}

});



}//launchForm()


function admin_persongroupForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_persongroup();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin persongroup ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_persongroup'
			 },
			 {xtype:'hidden',
             name:'persongroup_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'persongroup_name',
            fieldLabel: 'Persongroup Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_persongroup();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_persongroupinfo(formPanel,rid);
}

});



}//launchForm()


function admin_persongroupcategoryForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_groupcategory', {
    extend: 'Ext.data.Model',
	fields:['groupcategory_id','groupcategory_name']
	});

var admin_groupcategorydata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_groupcategory',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_groupcategory',
        reader: {
            type: 'json'
        }
    }
});

admin_groupcategorydata.load();


Ext.define('cmbAdmin_persongroup', {
    extend: 'Ext.data.Model',
	fields:['persongroup_id','persongroup_name']
	});

var admin_persongroupdata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_persongroup',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_persongroup',
        reader: {
            type: 'json'
        }
    }
});

admin_persongroupdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_persongroupcategory();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin persongroupcategory ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_persongroupcategory'
			 },
			 {xtype:'hidden',
             name:'persongroupcategory_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'persongroupcategory_name',
            fieldLabel: 'Persongroupcategory Name ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'groupcategory_id',
	forceSelection:true,
    fieldLabel: 'Groupcategory Id ',
    store: admin_groupcategorydata,
    queryMode: 'local',
    displayField: 'groupcategory_name',
    valueField: 'groupcategory_id'
	},
   {
    xtype: 'combobox',
	name:'persongroup_id',
	forceSelection:true,
    fieldLabel: 'Persongroup Id ',
    store: admin_persongroupdata,
    queryMode: 'local',
    displayField: 'persongroup_name',
    valueField: 'persongroup_id'
	},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_persongroupcategory();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_persongroupcategoryinfo(formPanel,rid);
}

});



}//launchForm()


function admin_personpersontypeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_personttypecategory', {
    extend: 'Ext.data.Model',
	fields:['personttypecategory_id','personttypecategory_name']
	});

var admin_personttypecategorydata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_personttypecategory',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_personttypecategory',
        reader: {
            type: 'json'
        }
    }
});

admin_personttypecategorydata.load();


Ext.define('cmbAdmin_person', {
    extend: 'Ext.data.Model',
	fields:['person_id','person_name']
	});

var admin_persondata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_person',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_person',
        reader: {
            type: 'json'
        }
    }
});

admin_persondata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_personpersontype();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin personpersontype ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_personpersontype'
			 },
			 {xtype:'hidden',
             name:'personpersontype_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'personpersontype_name',
            fieldLabel: 'Personpersontype Name ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'personttypecategory_id',
	forceSelection:true,
    fieldLabel: 'Personttypecategory Id ',
    store: admin_personttypecategorydata,
    queryMode: 'local',
    displayField: 'personttypecategory_name',
    valueField: 'personttypecategory_id'
	},
   {
    xtype: 'combobox',
	name:'person_id',
	forceSelection:true,
    fieldLabel: 'Person Id ',
    store: admin_persondata,
    queryMode: 'local',
    displayField: 'person_name',
    valueField: 'person_id'
	}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_personpersontype();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_personpersontypeinfo(formPanel,rid);
}

});



}//launchForm()


function admin_personttypecategoryForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_personttypecategory();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin personttypecategory ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_personttypecategory'
			 },
			 {xtype:'hidden',
             name:'personttypecategory_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'personttypecategory_name',
            fieldLabel: 'Personttypecategory Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'status',
            fieldLabel: 'Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_personttypecategory();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_personttypecategoryinfo(formPanel,rid);
}

});



}//launchForm()


function admin_photoForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_photo();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin photo ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_photo'
			 },
			 {xtype:'hidden',
             name:'photo_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'photo_name',
            fieldLabel: 'Photo Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'source_tablelist',
            fieldLabel: 'Source Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'source_ref',
            fieldLabel: 'Source Ref ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'prefered',
            fieldLabel: 'Prefered ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_photo();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_photoinfo(formPanel,rid);
}

});



}//launchForm()


function admin_plevelForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmb', {
    extend: 'Ext.data.Model',
	fields:['_id','_name']
	});

var data = Ext.create('Ext.data.Store', {
    model: 'cmb',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=',
        reader: {
            type: 'json'
        }
    }
});

data.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_plevel();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin plevel ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_plevel'
			 },
			 {xtype:'hidden',
             name:'plevel_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'paygradedecr_id',
	forceSelection:true,
    fieldLabel: 'Paygradedecr Id ',
    store: data,
    queryMode: 'local',
    displayField: '_name',
    valueField: '_id'
	},{
            xtype: 'textfield',
            name: 'plevel_name',
            fieldLabel: 'Plevel Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'paygrade_salary',
            fieldLabel: 'Paygrade Salary ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'per_day_pay',
            fieldLabel: 'Per Day Pay ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_plevel();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_plevelinfo(formPanel,rid);
}

});



}//launchForm()


function admin_privilegeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmb', {
    extend: 'Ext.data.Model',
	fields:['_id','_name']
	});

var data = Ext.create('Ext.data.Store', {
    model: 'cmb',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=',
        reader: {
            type: 'json'
        }
    }
});

data.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_privilege();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin privilege ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_privilege'
			 },
			 {xtype:'hidden',
             name:'privilege_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'privilege_name',
            fieldLabel: 'Privilege Name ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'statestetus_id',
	forceSelection:true,
    fieldLabel: 'Statestetus Id ',
    store: data,
    queryMode: 'local',
    displayField: '_name',
    valueField: '_id'
	},{
            xtype: 'textfield',
            name: 'section',
            fieldLabel: 'Section ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'refid',
            fieldLabel: 'Refid ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_privilege();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_privilegeinfo(formPanel,rid);
}

});



}//launchForm()


function admin_rangetypeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_rangetype();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin rangetype ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_rangetype'
			 },
			 {xtype:'hidden',
             name:'rangetype_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'rangetype_name',
            fieldLabel: 'Rangetype Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'type_description',
            fieldLabel: 'Type Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_rangetype();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_rangetypeinfo(formPanel,rid);
}

});



}//launchForm()


function admin_roleForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_role();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin role ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_role'
			 },
			 {xtype:'hidden',
             name:'role_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'role_name',
            fieldLabel: 'Role Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_role();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_roleinfo(formPanel,rid);
}

});



}//launchForm()


function admin_rolenotificationForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_role', {
    extend: 'Ext.data.Model',
	fields:['role_id','role_name']
	});

var admin_roledata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_role',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_role',
        reader: {
            type: 'json'
        }
    }
});

admin_roledata.load();


Ext.define('cmbAdmin_rolenotificationevent', {
    extend: 'Ext.data.Model',
	fields:['rolenotificationevent_id','rolenotificationevent_name']
	});

var admin_rolenotificationeventdata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_rolenotificationevent',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_rolenotificationevent',
        reader: {
            type: 'json'
        }
    }
});

admin_rolenotificationeventdata.load();


Ext.define('cmbAdmin_table', {
    extend: 'Ext.data.Model',
	fields:['table_id','table_name']
	});

var admin_tabledata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_table',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_table',
        reader: {
            type: 'json'
        }
    }
});

admin_tabledata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_rolenotification();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin rolenotification ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_rolenotification'
			 },
			 {xtype:'hidden',
             name:'rolenotification_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'role_id',
	forceSelection:true,
    fieldLabel: 'Role Id ',
    store: admin_roledata,
    queryMode: 'local',
    displayField: 'role_name',
    valueField: 'role_id'
	},
   {
    xtype: 'combobox',
	name:'rolenotificationevent_id',
	forceSelection:true,
    fieldLabel: 'Rolenotificationevent Id ',
    store: admin_rolenotificationeventdata,
    queryMode: 'local',
    displayField: 'rolenotificationevent_name',
    valueField: 'rolenotificationevent_id'
	},
   {
    xtype: 'combobox',
	name:'table_id',
	forceSelection:true,
    fieldLabel: 'Table Id ',
    store: admin_tabledata,
    queryMode: 'local',
    displayField: 'table_name',
    valueField: 'table_id'
	},{
            xtype: 'textfield',
            name: 'notificationtype',
            fieldLabel: 'Notificationtype ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'notification_order',
            fieldLabel: 'Notification Order ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'awaits_activity',
            fieldLabel: 'Awaits Activity ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'success',
            fieldLabel: 'Success ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'failure',
            fieldLabel: 'Failure ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'undetermined',
            fieldLabel: 'Undetermined ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'comments',
            fieldLabel: 'Comments ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_rolenotification();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_rolenotificationinfo(formPanel,rid);
}

});



}//launchForm()


function admin_rolenotificationeventForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_rolenotificationevent();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin rolenotificationevent ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_rolenotificationevent'
			 },
			 {xtype:'hidden',
             name:'rolenotificationevent_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'rolenotificationevent_name',
            fieldLabel: 'Rolenotificationevent Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_rolenotificationevent();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_rolenotificationeventinfo(formPanel,rid);
}

});



}//launchForm()


function admin_rolenotificationhistForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_rolenotificationevent', {
    extend: 'Ext.data.Model',
	fields:['rolenotificationevent_id','rolenotificationevent_name']
	});

var admin_rolenotificationeventdata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_rolenotificationevent',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_rolenotificationevent',
        reader: {
            type: 'json'
        }
    }
});

admin_rolenotificationeventdata.load();


Ext.define('cmbAdmin_table', {
    extend: 'Ext.data.Model',
	fields:['table_id','table_name']
	});

var admin_tabledata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_table',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_table',
        reader: {
            type: 'json'
        }
    }
});

admin_tabledata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_rolenotificationhist();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin rolenotificationhist ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_rolenotificationhist'
			 },
			 {xtype:'hidden',
             name:'rolenotificationhist_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'rolenotificationhist_name',
            fieldLabel: 'Rolenotificationhist Name ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'rolenotificationevent_id',
	forceSelection:true,
    fieldLabel: 'Rolenotificationevent Id ',
    store: admin_rolenotificationeventdata,
    queryMode: 'local',
    displayField: 'rolenotificationevent_name',
    valueField: 'rolenotificationevent_id'
	},{
            xtype: 'textareafield',
            name: 'notification_details',
            fieldLabel: 'Notification Details ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'actioned_by',
            fieldLabel: 'Actioned By ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'action',
            fieldLabel: 'Action ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'primary_tablelist',
            fieldLabel: 'Primary Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'table_id',
	forceSelection:true,
    fieldLabel: 'Table Id ',
    store: admin_tabledata,
    queryMode: 'local',
    displayField: 'table_name',
    valueField: 'table_id'
	},{
            xtype: 'numberfield',
            name: 'recordid',
            fieldLabel: 'Recordid ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'status',
            fieldLabel: 'Status ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'comment',
            fieldLabel: 'Comment ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_rolenotificationhist();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_rolenotificationhistinfo(formPanel,rid);
}

});



}//launchForm()


function admin_rolepersonForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_person', {
    extend: 'Ext.data.Model',
	fields:['person_id','person_name']
	});

var admin_persondata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_person',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_person',
        reader: {
            type: 'json'
        }
    }
});

admin_persondata.load();


Ext.define('cmbAdmin_role', {
    extend: 'Ext.data.Model',
	fields:['role_id','role_name']
	});

var admin_roledata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_role',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_role',
        reader: {
            type: 'json'
        }
    }
});

admin_roledata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_roleperson();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin roleperson ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_roleperson'
			 },
			 {xtype:'hidden',
             name:'roleperson_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'person_id',
	forceSelection:true,
    fieldLabel: 'Person Id ',
    store: admin_persondata,
    queryMode: 'local',
    displayField: 'person_name',
    valueField: 'person_id'
	},
   {
    xtype: 'combobox',
	name:'role_id',
	forceSelection:true,
    fieldLabel: 'Role Id ',
    store: admin_roledata,
    queryMode: 'local',
    displayField: 'role_name',
    valueField: 'role_id'
	}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_roleperson();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_rolepersoninfo(formPanel,rid);
}

});



}//launchForm()


function admin_roleprivilegeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_role', {
    extend: 'Ext.data.Model',
	fields:['role_id','role_name']
	});

var admin_roledata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_role',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_role',
        reader: {
            type: 'json'
        }
    }
});

admin_roledata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_roleprivilege();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin roleprivilege ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_roleprivilege'
			 },
			 {xtype:'hidden',
             name:'roleprivilege_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'role_id',
	forceSelection:true,
    fieldLabel: 'Role Id ',
    store: admin_roledata,
    queryMode: 'local',
    displayField: 'role_name',
    valueField: 'role_id'
	},{
            xtype: 'textfield',
            name: 'privilegeid',
            fieldLabel: 'Privilegeid ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'activity',
            fieldLabel: 'Activity ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_roleprivilege();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_roleprivilegeinfo(formPanel,rid);
}

});



}//launchForm()


function admin_roleroleForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_role', {
    extend: 'Ext.data.Model',
	fields:['role_id','role_name']
	});

var admin_roledata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_role',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_role',
        reader: {
            type: 'json'
        }
    }
});

admin_roledata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_rolerole();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin rolerole ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_rolerole'
			 },
			 {xtype:'hidden',
             name:'rolerole_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'role_id',
	forceSelection:true,
    fieldLabel: 'Role Id ',
    store: admin_roledata,
    queryMode: 'local',
    displayField: 'role_name',
    valueField: 'role_id'
	},{
            xtype: 'numberfield',
            name: 'parent_role',
            fieldLabel: 'Parent Role ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_rolerole();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_roleroleinfo(formPanel,rid);
}

});



}//launchForm()


function admin_schartForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbDesigner_charttype', {
    extend: 'Ext.data.Model',
	fields:['charttype_id','charttype_name']
	});

var designer_charttypedata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_charttype',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_charttype',
        reader: {
            type: 'json'
        }
    }
});

designer_charttypedata.load();


Ext.define('cmbDesigner_aggrigate', {
    extend: 'Ext.data.Model',
	fields:['aggrigate_id','aggrigate_name']
	});

var designer_aggrigatedata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_aggrigate',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_aggrigate',
        reader: {
            type: 'json'
        }
    }
});

designer_aggrigatedata.load();


Ext.define('cmbAdmin_rangetype', {
    extend: 'Ext.data.Model',
	fields:['rangetype_id','rangetype_name']
	});

var admin_rangetypedata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_rangetype',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_rangetype',
        reader: {
            type: 'json'
        }
    }
});

admin_rangetypedata.load();


Ext.define('cmbAdmin_viewmode', {
    extend: 'Ext.data.Model',
	fields:['viewmode_id','viewmode_name']
	});

var admin_viewmodedata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_viewmode',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_viewmode',
        reader: {
            type: 'json'
        }
    }
});

admin_viewmodedata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_schart();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin schart ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_schart'
			 },
			 {xtype:'hidden',
             name:'schart_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'charttype_id',
	forceSelection:true,
    fieldLabel: 'Charttype Id ',
    store: designer_charttypedata,
    queryMode: 'local',
    displayField: 'charttype_name',
    valueField: 'charttype_id'
	},{
            xtype: 'textfield',
            name: 'schart_name',
            fieldLabel: 'Schart Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'chart_position',
            fieldLabel: 'Chart Position ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'tablelist',
            fieldLabel: 'Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'fieldlist_xaxis',
            fieldLabel: 'Fieldlist Xaxis ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'xaxiscaption',
            fieldLabel: 'Xaxiscaption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'fieldlist_yaxis',
            fieldLabel: 'Fieldlist Yaxis ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'aggrigate_id',
	forceSelection:true,
    fieldLabel: 'Aggrigate Id ',
    store: designer_aggrigatedata,
    queryMode: 'local',
    displayField: 'aggrigate_name',
    valueField: 'aggrigate_id'
	},
   {
    xtype: 'combobox',
	name:'rangetype_id',
	forceSelection:true,
    fieldLabel: 'Rangetype Id ',
    store: admin_rangetypedata,
    queryMode: 'local',
    displayField: 'rangetype_name',
    valueField: 'rangetype_id'
	},{
            xtype: 'textfield',
            name: 'range_begin',
            fieldLabel: 'Range Begin ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'yaxiscaption',
            fieldLabel: 'Yaxiscaption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'range_end',
            fieldLabel: 'Range End ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'viewmode_id',
	forceSelection:true,
    fieldLabel: 'Viewmode Id ',
    store: admin_viewmodedata,
    queryMode: 'local',
    displayField: 'viewmode_name',
    valueField: 'viewmode_id'
	}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_schart();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_schartinfo(formPanel,rid);
}

});



}//launchForm()


function admin_statementForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_statement();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin statement ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_statement'
			 },
			 {xtype:'hidden',
             name:'statement_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'tablename',
            fieldLabel: 'Tablename ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'statement_caption',
            fieldLabel: 'Statement Caption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'statement_link',
            fieldLabel: 'Statement Link ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'show_identifier',
            fieldLabel: 'Show Identifier ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'first_only',
            fieldLabel: 'First Only ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'pdfvisible',
            fieldLabel: 'Pdfvisible ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'position',
            fieldLabel: 'Position ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_statement();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_statementinfo(formPanel,rid);
}

});



}//launchForm()


function admin_statestatusForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_statestatus();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin statestatus ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_statestatus'
			 },
			 {xtype:'hidden',
             name:'statestatus_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'statestatus_name',
            fieldLabel: 'Statestatus Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_statestatus();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_statestatusinfo(formPanel,rid);
}

});



}//launchForm()


function admin_statestatustblForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmb', {
    extend: 'Ext.data.Model',
	fields:['_id','_name']
	});

var data = Ext.create('Ext.data.Store', {
    model: 'cmb',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=',
        reader: {
            type: 'json'
        }
    }
});

data.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_statestatustbl();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin statestatustbl ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_statestatustbl'
			 },
			 {xtype:'hidden',
             name:'statestatustbl_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'statestatus_id',
	forceSelection:true,
    fieldLabel: 'Statestatus Id ',
    store: data,
    queryMode: 'local',
    displayField: '_name',
    valueField: '_id'
	},{
            xtype: 'textfield',
            name: 'table_list',
            fieldLabel: 'Table List ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'field_list',
            fieldLabel: 'Field List ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'status',
            fieldLabel: 'Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_statestatustbl();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_statestatustblinfo(formPanel,rid);
}

});



}//launchForm()


function admin_statusForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmb', {
    extend: 'Ext.data.Model',
	fields:['_id','_name']
	});

var data = Ext.create('Ext.data.Store', {
    model: 'cmb',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=',
        reader: {
            type: 'json'
        }
    }
});

data.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_status();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin status ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_status'
			 },
			 {xtype:'hidden',
             name:'status_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'statustype_id',
	forceSelection:true,
    fieldLabel: 'Statustype Id ',
    store: data,
    queryMode: 'local',
    displayField: '_name',
    valueField: '_id'
	},{
            xtype: 'textfield',
            name: 'status_name',
            fieldLabel: 'Status Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'caption',
            fieldLabel: 'Caption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'position',
            fieldLabel: 'Position ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_status();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_statusinfo(formPanel,rid);
}

});



}//launchForm()


function admin_systemvariableForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_systemvariable();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin systemvariable ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_systemvariable'
			 },
			 {xtype:'hidden',
             name:'systemvariable_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'systemvariable_name',
            fieldLabel: 'Systemvariable Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_systemvariable();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_systemvariableinfo(formPanel,rid);
}

});



}//launchForm()


function admin_tableForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_table();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin table ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_table'
			 },
			 {xtype:'hidden',
             name:'table_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'table_name',
            fieldLabel: 'Table Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'table_caption',
            fieldLabel: 'Table Caption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'statement_caption',
            fieldLabel: 'Statement Caption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'flexcolumn',
            fieldLabel: 'Flexcolumn ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'gridwidth',
            fieldLabel: 'Gridwidth ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'gridhieght',
            fieldLabel: 'Gridhieght ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'formheight',
            fieldLabel: 'Formheight ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'orderpos',
            fieldLabel: 'Orderpos ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_table();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_tableinfo(formPanel,rid);
}

});



}//launchForm()


function admin_timeperiodtypeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_timeperiodtype();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin timeperiodtype ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_timeperiodtype'
			 },
			 {xtype:'hidden',
             name:'timeperiodtype_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'timeperiodtype_name',
            fieldLabel: 'Timeperiodtype Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_timeperiodtype();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_timeperiodtypeinfo(formPanel,rid);
}

});



}//launchForm()


function admin_userForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmb', {
    extend: 'Ext.data.Model',
	fields:['_id','_name']
	});

var data = Ext.create('Ext.data.Store', {
    model: 'cmb',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=',
        reader: {
            type: 'json'
        }
    }
});

data.load();


Ext.define('cmb', {
    extend: 'Ext.data.Model',
	fields:['_id','_name']
	});

var data = Ext.create('Ext.data.Store', {
    model: 'cmb',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=',
        reader: {
            type: 'json'
        }
    }
});

data.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_user();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin user ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_user'
			 },
			 {xtype:'hidden',
             name:'user_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'employee_id',
	forceSelection:true,
    fieldLabel: 'Employee Id ',
    store: data,
    queryMode: 'local',
    displayField: '_name',
    valueField: '_id'
	},{
            xtype: 'textfield',
            name: 'userid',
            fieldLabel: 'Userid ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'user_password',
            fieldLabel: 'User Password ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'UserName',
            fieldLabel: 'UserName ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'user_priviledge',
            fieldLabel: 'User Priviledge ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'security_question',
            fieldLabel: 'Security Question ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'security_q_answer',
            fieldLabel: 'Security Q Answer ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'usergroup_id',
	forceSelection:true,
    fieldLabel: 'Usergroup Id ',
    store: data,
    queryMode: 'local',
    displayField: '_name',
    valueField: '_id'
	},{
            xtype: 'textfield',
            name: 'user_active_status',
            fieldLabel: 'User Active Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_user();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_userinfo(formPanel,rid);
}

});



}//launchForm()


function admin_usergrouproleForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmb', {
    extend: 'Ext.data.Model',
	fields:['_id','_name']
	});

var data = Ext.create('Ext.data.Store', {
    model: 'cmb',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=',
        reader: {
            type: 'json'
        }
    }
});

data.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_usergrouprole();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin usergrouprole ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_usergrouprole'
			 },
			 {xtype:'hidden',
             name:'usergrouprole_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'usergroup_id',
	forceSelection:true,
    fieldLabel: 'Usergroup Id ',
    store: data,
    queryMode: 'local',
    displayField: '_name',
    valueField: '_id'
	},{
            xtype: 'textfield',
            name: 'tablename',
            fieldLabel: 'Tablename ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'previge',
            fieldLabel: 'Previge ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'start_date',
            fieldLabel: 'Start Date ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'end_date',
            fieldLabel: 'End Date ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_usergrouprole();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_usergrouproleinfo(formPanel,rid);
}

});



}//launchForm()


function admin_versionForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_version();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin version ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_version'
			 },
			 {xtype:'hidden',
             name:'version_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'version_name',
            fieldLabel: 'Version Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'entered_date',
            fieldLabel: 'Entered Date ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'modified_date',
            fieldLabel: 'Modified Date ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_version();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_versioninfo(formPanel,rid);
}

});



}//launchForm()


function admin_viewiconForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_viewicon();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin viewicon ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_viewicon'
			 },
			 {xtype:'hidden',
             name:'viewicon_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'viewicon_name',
            fieldLabel: 'Viewicon Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_viewicon();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_viewiconinfo(formPanel,rid);
}

});



}//launchForm()


function admin_viewmodeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_viewmode();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  admin viewmode ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'admin_viewmode'
			 },
			 {xtype:'hidden',
             name:'viewmode_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'viewmode_name',
            fieldLabel: 'Viewmode Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'viewmode_status',
            fieldLabel: 'Viewmode Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewadmin_viewmode();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadadmin_viewmodeinfo(formPanel,rid);
}

});



}//launchForm()


function com_batchemailForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_persongroup', {
    extend: 'Ext.data.Model',
	fields:['persongroup_id','persongroup_name']
	});

var admin_persongroupdata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_persongroup',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_persongroup',
        reader: {
            type: 'json'
        }
    }
});

admin_persongroupdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewcom_batchemail();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  com batchemail ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'com_batchemail'
			 },
			 {xtype:'hidden',
             name:'batchemail_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'batchemail_name',
            fieldLabel: 'Batchemail Name ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'persongroup_id',
	forceSelection:true,
    fieldLabel: 'Persongroup Id ',
    store: admin_persongroupdata,
    queryMode: 'local',
    displayField: 'persongroup_name',
    valueField: 'persongroup_id'
	},{
            xtype: 'textfield',
            name: 'subject',
            fieldLabel: 'Subject ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'body',
            fieldLabel: 'Body ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'transaction_date',
            fieldLabel: 'Transaction Date ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewcom_batchemail();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadcom_batchemailinfo(formPanel,rid);
}

});



}//launchForm()


function com_emailsettingsForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewcom_emailsettings();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  com emailsettings ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'com_emailsettings'
			 },
			 {xtype:'hidden',
             name:'emailsettings_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'email_address',
            fieldLabel: 'Email Address ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'password',
            fieldLabel: 'Password ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'port',
            fieldLabel: 'Port ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'host',
            fieldLabel: 'Host ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'send_from',
            fieldLabel: 'Send From ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'SMT_secure',
            fieldLabel: 'SMT Secure ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'SMPT_authentication',
            fieldLabel: 'SMPT Authentication ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'preferred',
            fieldLabel: 'Preferred ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'comment',
            fieldLabel: 'Comment ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewcom_emailsettings();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadcom_emailsettingsinfo(formPanel,rid);
}

});



}//launchForm()


function com_sendemailForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewcom_sendemail();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  com sendemail ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'com_sendemail'
			 },
			 {xtype:'hidden',
             name:'sendemail_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'syowner',
            fieldLabel: 'Syowner ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'syownerid',
            fieldLabel: 'Syownerid ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'email_subject',
            fieldLabel: 'Email Subject ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'email_body',
            fieldLabel: 'Email Body ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'attachments',
            fieldLabel: 'Attachments ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewcom_sendemail();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadcom_sendemailinfo(formPanel,rid);
}

});



}//launchForm()


function designer_aggrigateForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_aggrigate();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer aggrigate ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_aggrigate'
			 },
			 {xtype:'hidden',
             name:'aggrigate_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'aggrigate_name',
            fieldLabel: 'Aggrigate Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'aggrigate_description',
            fieldLabel: 'Aggrigate Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_aggrigate();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_aggrigateinfo(formPanel,rid);
}

});



}//launchForm()


function designer_aggrigatetypeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_aggrigatetype();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer aggrigatetype ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_aggrigatetype'
			 },
			 {xtype:'hidden',
             name:'aggrigatetype_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'aggrigatetype_name',
            fieldLabel: 'Aggrigatetype Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_aggrigatetype();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_aggrigatetypeinfo(formPanel,rid);
}

});



}//launchForm()


function designer_categorizeotherForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbDesigner_othercategory', {
    extend: 'Ext.data.Model',
	fields:['othercategory_id','othercategory_name']
	});

var designer_othercategorydata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_othercategory',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_othercategory',
        reader: {
            type: 'json'
        }
    }
});

designer_othercategorydata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_categorizeother();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer categorizeother ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_categorizeother'
			 },
			 {xtype:'hidden',
             name:'categorizeother_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'categorizeother_name',
            fieldLabel: 'Categorizeother Name ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'othercategory_id',
	forceSelection:true,
    fieldLabel: 'Othercategory Id ',
    store: designer_othercategorydata,
    queryMode: 'local',
    displayField: 'othercategory_name',
    valueField: 'othercategory_id'
	}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_categorizeother();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_categorizeotherinfo(formPanel,rid);
}

});



}//launchForm()


function designer_charttypeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_charttype();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer charttype ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_charttype'
			 },
			 {xtype:'hidden',
             name:'charttype_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'charttype_name',
            fieldLabel: 'Charttype Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'charttype_description',
            fieldLabel: 'Charttype Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_charttype();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_charttypeinfo(formPanel,rid);
}

});



}//launchForm()


function designer_combocustomizationForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_combocustomization();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer combocustomization ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_combocustomization'
			 },
			 {xtype:'hidden',
             name:'combocustomization_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'combo_tablelist',
            fieldLabel: 'Combo Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'fieldvalue',
            fieldLabel: 'Fieldvalue ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'othervalues',
            fieldLabel: 'Othervalues ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_combocustomization();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_combocustomizationinfo(formPanel,rid);
}

});



}//launchForm()


function designer_crdbdeterminantForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_crdbdeterminant();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer crdbdeterminant ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_crdbdeterminant'
			 },
			 {xtype:'hidden',
             name:'crdbdeterminant_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'credit_tablelist',
            fieldLabel: 'Credit Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'debit_tablelist',
            fieldLabel: 'Debit Tablelist ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_crdbdeterminant();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_crdbdeterminantinfo(formPanel,rid);
}

});



}//launchForm()


function designer_custfuncForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_custfunc();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer custfunc ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_custfunc'
			 },
			 {xtype:'hidden',
             name:'custfunc_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'custfunc_name',
            fieldLabel: 'Custfunc Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'func_tablelist',
            fieldLabel: 'Func Tablelist ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_custfunc();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_custfuncinfo(formPanel,rid);
}

});



}//launchForm()


function designer_datatypeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_datatype();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer datatype ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_datatype'
			 },
			 {xtype:'hidden',
             name:'datatype_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'datatype_name',
            fieldLabel: 'Datatype Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_datatype();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_datatypeinfo(formPanel,rid);
}

});



}//launchForm()


function designer_fasttbldesignForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbDesigner_sview', {
    extend: 'Ext.data.Model',
	fields:['sview_id','sview_name']
	});

var designer_sviewdata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_sview',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_sview',
        reader: {
            type: 'json'
        }
    }
});

designer_sviewdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_fasttbldesign();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer fasttbldesign ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_fasttbldesign'
			 },
			 {xtype:'hidden',
             name:'fasttbldesign_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'sview_id',
	forceSelection:true,
    fieldLabel: 'Sview Id ',
    store: designer_sviewdata,
    queryMode: 'local',
    displayField: 'sview_name',
    valueField: 'sview_id'
	},{
            xtype: 'textfield',
            name: 'primary_tablelist',
            fieldLabel: 'Primary Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'secondary_tablelist',
            fieldLabel: 'Secondary Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'tabcaption',
            fieldLabel: 'Tabcaption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'tab_index',
            fieldLabel: 'Tab Index ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_fasttbldesign();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_fasttbldesigninfo(formPanel,rid);
}

});



}//launchForm()


function designer_fieldcustomizationForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbStructure_displaytype', {
    extend: 'Ext.data.Model',
	fields:['displaytype_id','displaytype_name']
	});

var structure_displaytypedata = Ext.create('Ext.data.Store', {
    model: 'cmbStructure_displaytype',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=structure_displaytype',
        reader: {
            type: 'json'
        }
    }
});

structure_displaytypedata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_fieldcustomization();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer fieldcustomization ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_fieldcustomization'
			 },
			 {xtype:'hidden',
             name:'fieldcustomization_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'field_tablelist',
            fieldLabel: 'Field Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'current_fieldname',
            fieldLabel: 'Current Fieldname ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'displaytype_id',
	forceSelection:true,
    fieldLabel: 'Displaytype Id ',
    store: structure_displaytypedata,
    queryMode: 'local',
    displayField: 'displaytype_name',
    valueField: 'displaytype_id'
	},{
            xtype: 'textfield',
            name: 'caption',
            fieldLabel: 'Caption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'is_visible',
            fieldLabel: 'Is Visible ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'num_cols',
            fieldLabel: 'Num Cols ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'options',
            fieldLabel: 'Options ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_fieldcustomization();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_fieldcustomizationinfo(formPanel,rid);
}

});



}//launchForm()


function designer_flexcolumnForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_flexcolumn();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer flexcolumn ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_flexcolumn'
			 },
			 {xtype:'hidden',
             name:'flexcolumn_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'primary_tablelist',
            fieldLabel: 'Primary Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'options_tablelist',
            fieldLabel: 'Options Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'orderby',
            fieldLabel: 'Orderby ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'default_section',
            fieldLabel: 'Default Section ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_flexcolumn();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_flexcolumninfo(formPanel,rid);
}

});



}//launchForm()


function designer_genderForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_gender();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer gender ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_gender'
			 },
			 {xtype:'hidden',
             name:'gender_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'gender_name',
            fieldLabel: 'Gender Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_gender();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_genderinfo(formPanel,rid);
}

});



}//launchForm()


function designer_grouptblsForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbDesigner_tblgroup', {
    extend: 'Ext.data.Model',
	fields:['tblgroup_id','tblgroup_name']
	});

var designer_tblgroupdata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_tblgroup',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_tblgroup',
        reader: {
            type: 'json'
        }
    }
});

designer_tblgroupdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_grouptbls();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer grouptbls ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_grouptbls'
			 },
			 {xtype:'hidden',
             name:'grouptbls_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'tblgroup_id',
	forceSelection:true,
    fieldLabel: 'Tblgroup Id ',
    store: designer_tblgroupdata,
    queryMode: 'local',
    displayField: 'tblgroup_name',
    valueField: 'tblgroup_id'
	},{
            xtype: 'textfield',
            name: 'tblgroup_tablelist',
            fieldLabel: 'Tblgroup Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'orderpos',
            fieldLabel: 'Orderpos ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'table_caption',
            fieldLabel: 'Table Caption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'menu',
            fieldLabel: 'Menu ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'statement',
            fieldLabel: 'Statement ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_grouptbls();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_grouptblsinfo(formPanel,rid);
}

});



}//launchForm()


function designer_othercategoryForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_othercategory();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer othercategory ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_othercategory'
			 },
			 {xtype:'hidden',
             name:'othercategory_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'othercategory_name',
            fieldLabel: 'Othercategory Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_othercategory();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_othercategoryinfo(formPanel,rid);
}

});



}//launchForm()


function designer_othermenuForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbDesigner_othercategory', {
    extend: 'Ext.data.Model',
	fields:['othercategory_id','othercategory_name']
	});

var designer_othercategorydata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_othercategory',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_othercategory',
        reader: {
            type: 'json'
        }
    }
});

designer_othercategorydata.load();


Ext.define('cmbAdmin_role', {
    extend: 'Ext.data.Model',
	fields:['role_id','role_name']
	});

var admin_roledata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_role',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_role',
        reader: {
            type: 'json'
        }
    }
});

admin_roledata.load();


Ext.define('cmbDesigner_tblgroup', {
    extend: 'Ext.data.Model',
	fields:['tblgroup_id','tblgroup_name']
	});

var designer_tblgroupdata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_tblgroup',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_tblgroup',
        reader: {
            type: 'json'
        }
    }
});

designer_tblgroupdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_othermenu();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer othermenu ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_othermenu'
			 },
			 {xtype:'hidden',
             name:'othermenu_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'othercategory_id',
	forceSelection:true,
    fieldLabel: 'Othercategory Id ',
    store: designer_othercategorydata,
    queryMode: 'local',
    displayField: 'othercategory_name',
    valueField: 'othercategory_id'
	},
   {
    xtype: 'combobox',
	name:'role_id',
	forceSelection:true,
    fieldLabel: 'Role Id ',
    store: admin_roledata,
    queryMode: 'local',
    displayField: 'role_name',
    valueField: 'role_id'
	},
   {
    xtype: 'combobox',
	name:'tblgroup_id',
	forceSelection:true,
    fieldLabel: 'Tblgroup Id ',
    store: designer_tblgroupdata,
    queryMode: 'local',
    displayField: 'tblgroup_name',
    valueField: 'tblgroup_id'
	},{
            xtype: 'textfield',
            name: 'menu_caption',
            fieldLabel: 'Menu Caption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'status',
            fieldLabel: 'Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_othermenu();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_othermenuinfo(formPanel,rid);
}

});



}//launchForm()


function designer_preaggrigateForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_preaggrigate();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer preaggrigate ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_preaggrigate'
			 },
			 {xtype:'hidden',
             name:'preaggrigate_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'preaggrigate_name',
            fieldLabel: 'Preaggrigate Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_preaggrigate();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_preaggrigateinfo(formPanel,rid);
}

});



}//launchForm()


function designer_queryfieldForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbReports_reportview', {
    extend: 'Ext.data.Model',
	fields:['reportview_id','reportview_name']
	});

var reports_reportviewdata = Ext.create('Ext.data.Store', {
    model: 'cmbReports_reportview',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=reports_reportview',
        reader: {
            type: 'json'
        }
    }
});

reports_reportviewdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_queryfield();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer queryfield ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_queryfield'
			 },
			 {xtype:'hidden',
             name:'queryfield_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'reportview_id',
	forceSelection:true,
    fieldLabel: 'Reportview Id ',
    store: reports_reportviewdata,
    queryMode: 'local',
    displayField: 'reportview_name',
    valueField: 'reportview_id'
	},{
            xtype: 'textareafield',
            name: 'report_caption',
            fieldLabel: 'Report Caption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'section_caption',
            fieldLabel: 'Section Caption ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'column_width',
            fieldLabel: 'Column Width ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'query',
            fieldLabel: 'Query ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_queryfield();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_queryfieldinfo(formPanel,rid);
}

});



}//launchForm()


function designer_relationshipForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_relationship();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer relationship ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_relationship'
			 },
			 {xtype:'hidden',
             name:'relationship_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'relationship_name',
            fieldLabel: 'Relationship Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_relationship();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_relationshipinfo(formPanel,rid);
}

});



}//launchForm()


function designer_relationshipstatusForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_relationshipstatus();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer relationshipstatus ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_relationshipstatus'
			 },
			 {xtype:'hidden',
             name:'relationshipstatus_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'relationshipstatus_name',
            fieldLabel: 'Relationshipstatus Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_relationshipstatus();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_relationshipstatusinfo(formPanel,rid);
}

});



}//launchForm()


function designer_resultdisplayForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_resultdisplay();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer resultdisplay ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_resultdisplay'
			 },
			 {xtype:'hidden',
             name:'resultdisplay_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'resultdisplay_name',
            fieldLabel: 'Resultdisplay Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_resultdisplay();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_resultdisplayinfo(formPanel,rid);
}

});



}//launchForm()


function designer_sectparentForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_sectparent();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer sectparent ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_sectparent'
			 },
			 {xtype:'hidden',
             name:'sectparent_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'sectparent_tablelist',
            fieldLabel: 'Sectparent Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'child_tablelist',
            fieldLabel: 'Child Tablelist ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_sectparent();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_sectparentinfo(formPanel,rid);
}

});



}//launchForm()


function designer_sformForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_sform();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer sform ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_sform'
			 },
			 {xtype:'hidden',
             name:'sform_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'sform_name',
            fieldLabel: 'Sform Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'active',
            fieldLabel: 'Active ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_sform();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_sforminfo(formPanel,rid);
}

});



}//launchForm()


function designer_sviewForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_sview();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer sview ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_sview'
			 },
			 {xtype:'hidden',
             name:'sview_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'sview_name',
            fieldLabel: 'Sview Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'context_menu',
            fieldLabel: 'Context Menu ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'main_caption',
            fieldLabel: 'Main Caption ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_sview();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_sviewinfo(formPanel,rid);
}

});



}//launchForm()


function designer_sysactionForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_sysaction();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer sysaction ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_sysaction'
			 },
			 {xtype:'hidden',
             name:'sysaction_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'sysaction_name',
            fieldLabel: 'Sysaction Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_sysaction();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_sysactioninfo(formPanel,rid);
}

});



}//launchForm()


function designer_sysmodulesForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_sysmodules();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer sysmodules ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_sysmodules'
			 },
			 {xtype:'hidden',
             name:'sysmodules_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'sysmodules_name',
            fieldLabel: 'Sysmodules Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_sysmodules();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_sysmodulesinfo(formPanel,rid);
}

});



}//launchForm()


function designer_systemclassForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_systemclass();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer systemclass ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_systemclass'
			 },
			 {xtype:'hidden',
             name:'systemclass_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'systemclass_name',
            fieldLabel: 'Systemclass Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_systemclass();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_systemclassinfo(formPanel,rid);
}

});



}//launchForm()


function designer_sytableForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_sytable();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer sytable ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_sytable'
			 },
			 {xtype:'hidden',
             name:'sytable_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'sytable_tablelist',
            fieldLabel: 'Sytable Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'invisible',
            fieldLabel: 'Invisible ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_sytable();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_sytableinfo(formPanel,rid);
}

});



}//launchForm()


function designer_tableactionForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbDesigner_sysaction', {
    extend: 'Ext.data.Model',
	fields:['sysaction_id','sysaction_name']
	});

var designer_sysactiondata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_sysaction',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_sysaction',
        reader: {
            type: 'json'
        }
    }
});

designer_sysactiondata.load();


Ext.define('cmbDesigner_resultdisplay', {
    extend: 'Ext.data.Model',
	fields:['resultdisplay_id','resultdisplay_name']
	});

var designer_resultdisplaydata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_resultdisplay',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_resultdisplay',
        reader: {
            type: 'json'
        }
    }
});

designer_resultdisplaydata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tableaction();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer tableaction ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_tableaction'
			 },
			 {xtype:'hidden',
             name:'tableaction_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'primary_tablelist',
            fieldLabel: 'Primary Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'sysaction_id',
	forceSelection:true,
    fieldLabel: 'Sysaction Id ',
    store: designer_sysactiondata,
    queryMode: 'local',
    displayField: 'sysaction_name',
    valueField: 'sysaction_id'
	},
   {
    xtype: 'combobox',
	name:'resultdisplay_id',
	forceSelection:true,
    fieldLabel: 'Resultdisplay Id ',
    store: designer_resultdisplaydata,
    queryMode: 'local',
    displayField: 'resultdisplay_name',
    valueField: 'resultdisplay_id'
	},{
            xtype: 'numberfield',
            name: 'activity_stage',
            fieldLabel: 'Activity Stage ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tableaction();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_tableactioninfo(formPanel,rid);
}

});



}//launchForm()


function designer_tabmngrForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbDesigner_sform', {
    extend: 'Ext.data.Model',
	fields:['sform_id','sform_name']
	});

var designer_sformdata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_sform',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_sform',
        reader: {
            type: 'json'
        }
    }
});

designer_sformdata.load();


Ext.define('cmbDesigner_sview', {
    extend: 'Ext.data.Model',
	fields:['sview_id','sview_name']
	});

var designer_sviewdata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_sview',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_sview',
        reader: {
            type: 'json'
        }
    }
});

designer_sviewdata.load();


Ext.define('cmbAdmin_viewmode', {
    extend: 'Ext.data.Model',
	fields:['viewmode_id','viewmode_name']
	});

var admin_viewmodedata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_viewmode',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_viewmode',
        reader: {
            type: 'json'
        }
    }
});

admin_viewmodedata.load();


Ext.define('cmbAdmin_viewicon', {
    extend: 'Ext.data.Model',
	fields:['viewicon_id','viewicon_name']
	});

var admin_viewicondata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_viewicon',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_viewicon',
        reader: {
            type: 'json'
        }
    }
});

admin_viewicondata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tabmngr();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer tabmngr ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_tabmngr'
			 },
			 {xtype:'hidden',
             name:'tabmngr_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'sform_id',
	forceSelection:true,
    fieldLabel: 'Sform Id ',
    store: designer_sformdata,
    queryMode: 'local',
    displayField: 'sform_name',
    valueField: 'sform_id'
	},
   {
    xtype: 'combobox',
	name:'sview_id',
	forceSelection:true,
    fieldLabel: 'Sview Id ',
    store: designer_sviewdata,
    queryMode: 'local',
    displayField: 'sview_name',
    valueField: 'sview_id'
	},{
            xtype: 'textfield',
            name: 'displaycolumns',
            fieldLabel: 'Displaycolumns ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'collapsible',
            fieldLabel: 'Collapsible ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'hideLabel',
            fieldLabel: 'HideLabel ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'collapsed',
            fieldLabel: 'Collapsed ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'is_primary',
            fieldLabel: 'Is Primary ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'tablelist_secondary',
            fieldLabel: 'Tablelist Secondary ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'secondary_position',
            fieldLabel: 'Secondary Position ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'display_caption',
            fieldLabel: 'Display Caption ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'viewmode_id',
	forceSelection:true,
    fieldLabel: 'Viewmode Id ',
    store: admin_viewmodedata,
    queryMode: 'local',
    displayField: 'viewmode_name',
    valueField: 'viewmode_id'
	},
   {
    xtype: 'combobox',
	name:'viewicon_id',
	forceSelection:true,
    fieldLabel: 'Viewicon Id ',
    store: admin_viewicondata,
    queryMode: 'local',
    displayField: 'viewicon_name',
    valueField: 'viewicon_id'
	},{
            xtype: 'textareafield',
            name: 'fieldlist_visible',
            fieldLabel: 'Fieldlist Visible ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tabmngr();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_tabmngrinfo(formPanel,rid);
}

});



}//launchForm()


function designer_tbgrplsubgrpForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmb', {
    extend: 'Ext.data.Model',
	fields:['_id','_name']
	});

var data = Ext.create('Ext.data.Store', {
    model: 'cmb',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=',
        reader: {
            type: 'json'
        }
    }
});

data.load();


Ext.define('cmbDesigner_tblgroup', {
    extend: 'Ext.data.Model',
	fields:['tblgroup_id','tblgroup_name']
	});

var designer_tblgroupdata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_tblgroup',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_tblgroup',
        reader: {
            type: 'json'
        }
    }
});

designer_tblgroupdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tbgrplsubgrp();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer tbgrplsubgrp ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_tbgrplsubgrp'
			 },
			 {xtype:'hidden',
             name:'tbgrplsubgrp_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'tblsubgrp_id',
	forceSelection:true,
    fieldLabel: 'Tblsubgrp Id ',
    store: data,
    queryMode: 'local',
    displayField: '_name',
    valueField: '_id'
	},
   {
    xtype: 'combobox',
	name:'tblgroup_id',
	forceSelection:true,
    fieldLabel: 'Tblgroup Id ',
    store: designer_tblgroupdata,
    queryMode: 'local',
    displayField: 'tblgroup_name',
    valueField: 'tblgroup_id'
	},{
            xtype: 'numberfield',
            name: 'position',
            fieldLabel: 'Position ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'caption',
            fieldLabel: 'Caption ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tbgrplsubgrp();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_tbgrplsubgrpinfo(formPanel,rid);
}

});



}//launchForm()


function designer_tblgroupForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tblgroup();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer tblgroup ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_tblgroup'
			 },
			 {xtype:'hidden',
             name:'tblgroup_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'tblgroup_name',
            fieldLabel: 'Tblgroup Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'caption',
            fieldLabel: 'Caption ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tblgroup();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_tblgroupinfo(formPanel,rid);
}

});



}//launchForm()


function designer_tblrelationForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbAdmin_person', {
    extend: 'Ext.data.Model',
	fields:['person_id','person_name']
	});

var admin_persondata = Ext.create('Ext.data.Store', {
    model: 'cmbAdmin_person',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=admin_person',
        reader: {
            type: 'json'
        }
    }
});

admin_persondata.load();


Ext.define('cmbDesigner_relationship', {
    extend: 'Ext.data.Model',
	fields:['relationship_id','relationship_name']
	});

var designer_relationshipdata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_relationship',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_relationship',
        reader: {
            type: 'json'
        }
    }
});

designer_relationshipdata.load();


Ext.define('cmbDesigner_relationshipstatus', {
    extend: 'Ext.data.Model',
	fields:['relationshipstatus_id','relationshipstatus_name']
	});

var designer_relationshipstatusdata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_relationshipstatus',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_relationshipstatus',
        reader: {
            type: 'json'
        }
    }
});

designer_relationshipstatusdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tblrelation();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer tblrelation ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_tblrelation'
			 },
			 {xtype:'hidden',
             name:'tblrelation_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'person_id',
	forceSelection:true,
    fieldLabel: 'Person Id ',
    store: admin_persondata,
    queryMode: 'local',
    displayField: 'person_name',
    valueField: 'person_id'
	},{
            xtype: 'numberfield',
            name: 'personrelated_to',
            fieldLabel: 'Personrelated To ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'relationship_id',
	forceSelection:true,
    fieldLabel: 'Relationship Id ',
    store: designer_relationshipdata,
    queryMode: 'local',
    displayField: 'relationship_name',
    valueField: 'relationship_id'
	},
   {
    xtype: 'combobox',
	name:'relationshipstatus_id',
	forceSelection:true,
    fieldLabel: 'Relationshipstatus Id ',
    store: designer_relationshipstatusdata,
    queryMode: 'local',
    displayField: 'relationshipstatus_name',
    valueField: 'relationshipstatus_id'
	}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tblrelation();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_tblrelationinfo(formPanel,rid);
}

});



}//launchForm()


function designer_tblsubgrpForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tblsubgrp();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer tblsubgrp ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_tblsubgrp'
			 },
			 {xtype:'hidden',
             name:'tblsubgrp_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'tblsubgrp_name',
            fieldLabel: 'Tblsubgrp Name ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tblsubgrp();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_tblsubgrpinfo(formPanel,rid);
}

});



}//launchForm()


function designer_tblsummaryForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbDesigner_aggrigatetype', {
    extend: 'Ext.data.Model',
	fields:['aggrigatetype_id','aggrigatetype_name']
	});

var designer_aggrigatetypedata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_aggrigatetype',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_aggrigatetype',
        reader: {
            type: 'json'
        }
    }
});

designer_aggrigatetypedata.load();


Ext.define('cmbDesigner_preaggrigate', {
    extend: 'Ext.data.Model',
	fields:['preaggrigate_id','preaggrigate_name']
	});

var designer_preaggrigatedata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_preaggrigate',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_preaggrigate',
        reader: {
            type: 'json'
        }
    }
});

designer_preaggrigatedata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tblsummary();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer tblsummary ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_tblsummary'
			 },
			 {xtype:'hidden',
             name:'tblsummary_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'aggrigate_tablelist',
            fieldLabel: 'Aggrigate Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'aggrigate_field',
            fieldLabel: 'Aggrigate Field ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'aggrigate_caption',
            fieldLabel: 'Aggrigate Caption ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'aggrigatetype_id',
	forceSelection:true,
    fieldLabel: 'Aggrigatetype Id ',
    store: designer_aggrigatetypedata,
    queryMode: 'local',
    displayField: 'aggrigatetype_name',
    valueField: 'aggrigatetype_id'
	},
   {
    xtype: 'combobox',
	name:'preaggrigate_id',
	forceSelection:true,
    fieldLabel: 'Preaggrigate Id ',
    store: designer_preaggrigatedata,
    queryMode: 'local',
    displayField: 'preaggrigate_name',
    valueField: 'preaggrigate_id'
	},{
            xtype: 'textfield',
            name: 'is_visible',
            fieldLabel: 'Is Visible ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_tblsummary();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_tblsummaryinfo(formPanel,rid);
}

});



}//launchForm()


function designer_viewiconForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_viewicon();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer viewicon ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_viewicon'
			 },
			 {xtype:'hidden',
             name:'viewicon_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'viewicon_name',
            fieldLabel: 'Viewicon Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'viewicon_image',
            fieldLabel: 'Viewicon Image ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_viewicon();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_viewiconinfo(formPanel,rid);
}

});



}//launchForm()


function designer_viewmodeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_viewmode();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer viewmode ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_viewmode'
			 },
			 {xtype:'hidden',
             name:'viewmode_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'viewmode_name',
            fieldLabel: 'Viewmode Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'viewmode_status',
            fieldLabel: 'Viewmode Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_viewmode();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_viewmodeinfo(formPanel,rid);
}

});



}//launchForm()


function designer_viewphotoForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbDesigner_sview', {
    extend: 'Ext.data.Model',
	fields:['sview_id','sview_name']
	});

var designer_sviewdata = Ext.create('Ext.data.Store', {
    model: 'cmbDesigner_sview',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=designer_sview',
        reader: {
            type: 'json'
        }
    }
});

designer_sviewdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_viewphoto();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  designer viewphoto ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'designer_viewphoto'
			 },
			 {xtype:'hidden',
             name:'viewphoto_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'sview_id',
	forceSelection:true,
    fieldLabel: 'Sview Id ',
    store: designer_sviewdata,
    queryMode: 'local',
    displayField: 'sview_name',
    valueField: 'sview_id'
	},{
            xtype: 'textfield',
            name: 'show_photo',
            fieldLabel: 'Show Photo ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewdesigner_viewphoto();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loaddesigner_viewphotoinfo(formPanel,rid);
}

});



}//launchForm()


function payment_bankForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewpayment_bank();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  payment bank ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'payment_bank'
			 },
			 {xtype:'hidden',
             name:'bank_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'bank_name',
            fieldLabel: 'Bank Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'code',
            fieldLabel: 'Code ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewpayment_bank();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadpayment_bankinfo(formPanel,rid);
}

});



}//launchForm()


function payment_costcenterForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmb', {
    extend: 'Ext.data.Model',
	fields:['_id','_name']
	});

var data = Ext.create('Ext.data.Store', {
    model: 'cmb',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=',
        reader: {
            type: 'json'
        }
    }
});

data.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewpayment_costcenter();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  payment costcenter ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'payment_costcenter'
			 },
			 {xtype:'hidden',
             name:'costcenter_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'costcenter_name',
            fieldLabel: 'Costcenter Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'cost_center_value',
            fieldLabel: 'Cost Center Value ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'use_cost_center_value',
            fieldLabel: 'Use Cost Center Value ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'employee_id',
	forceSelection:true,
    fieldLabel: 'Employee Id ',
    store: data,
    queryMode: 'local',
    displayField: '_name',
    valueField: '_id'
	},{
            xtype: 'textareafield',
            name: 'comments',
            fieldLabel: 'Comments ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewpayment_costcenter();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadpayment_costcenterinfo(formPanel,rid);
}

});



}//launchForm()


function payment_costcenterallocationForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbPayment_costcenter', {
    extend: 'Ext.data.Model',
	fields:['costcenter_id','costcenter_name']
	});

var payment_costcenterdata = Ext.create('Ext.data.Store', {
    model: 'cmbPayment_costcenter',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=payment_costcenter',
        reader: {
            type: 'json'
        }
    }
});

payment_costcenterdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewpayment_costcenterallocation();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  payment costcenterallocation ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'payment_costcenterallocation'
			 },
			 {xtype:'hidden',
             name:'costcenterallocation_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'costcenter_id',
	forceSelection:true,
    fieldLabel: 'Costcenter Id ',
    store: payment_costcenterdata,
    queryMode: 'local',
    displayField: 'costcenter_name',
    valueField: 'costcenter_id'
	},{
            xtype: 'numberfield',
            name: 'amount',
            fieldLabel: 'Amount ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'date_allocated',
            fieldLabel: 'Date Allocated ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'comment',
            fieldLabel: 'Comment ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewpayment_costcenterallocation();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadpayment_costcenterallocationinfo(formPanel,rid);
}

});



}//launchForm()


function payment_currencyForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewpayment_currency();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  payment currency ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'payment_currency'
			 },
			 {xtype:'hidden',
             name:'currency_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'currency_code',
            fieldLabel: 'Currency Code ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'currency_name',
            fieldLabel: 'Currency Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'exchange_rate',
            fieldLabel: 'Exchange Rate ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewpayment_currency();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadpayment_currencyinfo(formPanel,rid);
}

});



}//launchForm()


function sms_autoresponseForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_autoresponse();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Auto response ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_autoresponse'
			 },
			 {xtype:'hidden',
             name:'autoresponse_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'message_from',
            fieldLabel: 'Message From ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'request_type',
            fieldLabel: 'Request Type ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'message_message',
            fieldLabel: 'Message Message ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_autoresponse();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_autoresponseinfo(formPanel,rid);
}

});



}//launchForm()


function sms_billhandleForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbSms_smsmsgcust', {
    extend: 'Ext.data.Model',
	fields:['smsmsgcust_id','smsmsgcust_name']
	});

var sms_smsmsgcustdata = Ext.create('Ext.data.Store', {
    model: 'cmbSms_smsmsgcust',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=sms_smsmsgcust',
        reader: {
            type: 'json'
        }
    }
});

sms_smsmsgcustdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_billhandle();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Queued SMS ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_billhandle'
			 },
			 {xtype:'hidden',
             name:'billhandle_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'connection_number',
            fieldLabel: 'Connection Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'amount',
            fieldLabel: 'Amount ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'phone_number',
            fieldLabel: 'Phone Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'pay_before',
            fieldLabel: 'Pay Before ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'smsmsgcust_id',
	forceSelection:true,
    fieldLabel: 'Smsmsgcust Id ',
    store: sms_smsmsgcustdata,
    queryMode: 'local',
    displayField: 'smsmsgcust_name',
    valueField: 'smsmsgcust_id'
	},{
            xtype: 'textfield',
            name: 'prev_reading',
            fieldLabel: 'Prev Reading ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'proposed_message',
            fieldLabel: 'Proposed Message ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'curr_reading',
            fieldLabel: 'Curr Reading ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'consumption',
            fieldLabel: 'Consumption ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_billhandle();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_billhandleinfo(formPanel,rid);
}

});



}//launchForm()


function sms_billmonthForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_billmonth();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  sms billmonth ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_billmonth'
			 },
			 {xtype:'hidden',
             name:'billmonth_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'billmonth_name',
            fieldLabel: 'Billmonth Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'bill_month',
            fieldLabel: 'Bill Month ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_billmonth();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_billmonthinfo(formPanel,rid);
}

});



}//launchForm()



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_billyear();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  sms billyear ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_billyear'
			 },
			 {xtype:'hidden',
             name:'billyear_id',
			 value:''
			 }, dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_billyear();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_billyearinfo(formPanel,rid);
}

});



}//launchForm()


function sms_creditbalanceForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_creditbalance();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  Airtime Credit Balance ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_creditbalance'
			 },
			 {xtype:'hidden',
             name:'creditbalance_id',
			 value:''
			 },{
            xtype: 'numberfield',
            name: 'balance',
            fieldLabel: 'Balance ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_creditbalance();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_creditbalanceinfo(formPanel,rid);
}

});



}//launchForm()


function sms_disconnscheduleForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbSms_smsmsgcust', {
    extend: 'Ext.data.Model',
	fields:['smsmsgcust_id','smsmsgcust_name']
	});

var sms_smsmsgcustdata = Ext.create('Ext.data.Store', {
    model: 'cmbSms_smsmsgcust',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=sms_smsmsgcust',
        reader: {
            type: 'json'
        }
    }
});

sms_smsmsgcustdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_disconnschedule();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Disconnection Schedule List ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_disconnschedule'
			 },
			 {xtype:'hidden',
             name:'disconnschedule_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'disconnschedule_name',
            fieldLabel: 'Disconnschedule Name ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'smsmsgcust_id',
	forceSelection:true,
    fieldLabel: 'Message Type',
    store: sms_smsmsgcustdata,
    queryMode: 'local',
    displayField: 'smsmsgcust_name',
    valueField: 'smsmsgcust_id'
	},{
            xtype: 'textareafield',
            name: 'schedule_description',
            fieldLabel: 'Schedule Description ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'bill_date',
            fieldLabel: 'Bill Date ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'due_after',
            fieldLabel: 'Due After ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'file_brouwse',
            fieldLabel: 'File Brouwse ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_disconnschedule();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_disconnscheduleinfo(formPanel,rid);
}

});



}//launchForm()


function sms_emailhandleForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbSms_billmonth', {
    extend: 'Ext.data.Model',
	fields:['billmonth_id','billmonth_name']
	});

var sms_billmonthdata = Ext.create('Ext.data.Store', {
    model: 'cmbSms_billmonth',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=sms_billmonth',
        reader: {
            type: 'json'
        }
    }
});

sms_billmonthdata.load();


Ext.define('cmbSms_billyear', {
    extend: 'Ext.data.Model',
	fields:['billyear_id','billyear_name']
	});

var sms_billyeardata = Ext.create('Ext.data.Store', {
    model: 'cmbSms_billyear',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=sms_billyear',
        reader: {
            type: 'json'
        }
    }
});

sms_billyeardata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_emailhandle();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Queued Emails ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_emailhandle'
			 },
			 {xtype:'hidden',
             name:'emailhandle_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'connection_number',
            fieldLabel: 'Connection Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'zone',
            fieldLabel: 'Zone ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'email_address',
            fieldLabel: 'Email Address ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'billmonth_id',
	forceSelection:true,
    fieldLabel: 'Month',
    store: sms_billmonthdata,
    queryMode: 'local',
    displayField: 'billmonth_name',
    valueField: 'billmonth_id'
	},
   {
    xtype: 'combobox',
	name:'billyear_id',
	forceSelection:true,
    fieldLabel: 'Year',
    store: sms_billyeardata,
    queryMode: 'local',
    displayField: 'billyear_name',
    valueField: 'billyear_id'
	}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_emailhandle();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_emailhandleinfo(formPanel,rid);
}

});



}//launchForm()


function sms_emailscheduleForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbSms_billmonth', {
    extend: 'Ext.data.Model',
	fields:['billmonth_id','billmonth_name']
	});

var sms_billmonthdata = Ext.create('Ext.data.Store', {
    model: 'cmbSms_billmonth',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=sms_billmonth',
        reader: {
            type: 'json'
        }
    }
});

sms_billmonthdata.load();


Ext.define('cmbSms_billyear', {
    extend: 'Ext.data.Model',
	fields:['billyear_id','billyear_name']
	});

var sms_billyeardata = Ext.create('Ext.data.Store', {
    model: 'cmbSms_billyear',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=sms_billyear',
        reader: {
            type: 'json'
        }
    }
});

sms_billyeardata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_emailschedule();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Email Schedules ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_emailschedule'
			 },
			 {xtype:'hidden',
             name:'emailschedule_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'emailschedule_name',
            fieldLabel: 'Emailschedule Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'schedule_description',
            fieldLabel: 'Schedule Description ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'zone',
            fieldLabel: 'Zone ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'connection_number',
            fieldLabel: 'Connection Number ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'billmonth_id',
	forceSelection:true,
    fieldLabel: 'Month',
    store: sms_billmonthdata,
    queryMode: 'local',
    displayField: 'billmonth_name',
    valueField: 'billmonth_id'
	},
   {
    xtype: 'combobox',
	name:'billyear_id',
	forceSelection:true,
    fieldLabel: 'Year',
    store: sms_billyeardata,
    queryMode: 'local',
    displayField: 'billyear_name',
    valueField: 'billyear_id'
	}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_emailschedule();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_emailscheduleinfo(formPanel,rid);
}

});



}//launchForm()


function sms_generalsmshandleForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_generalsmshandle();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update General SMS Queue ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_generalsmshandle'
			 },
			 {xtype:'hidden',
             name:'generalsmshandle_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'recepient',
            fieldLabel: 'Recepient ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'phone_number',
            fieldLabel: 'Phone Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'message',
            fieldLabel: 'Message ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_generalsmshandle();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_generalsmshandleinfo(formPanel,rid);
}

});



}//launchForm()


function sms_indsmsForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_indsms();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Single SMS ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_indsms'
			 },
			 {xtype:'hidden',
             name:'indsms_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'reciepient',
            fieldLabel: 'Reciepient ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'message',
            fieldLabel: 'Message ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_indsms();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_indsmsinfo(formPanel,rid);
}

});



}//launchForm()


function sms_invalidemailaddressForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_invalidemailaddress();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Invalid Email Addressses ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_invalidemailaddress'
			 },
			 {xtype:'hidden',
             name:'invalidemailaddress_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'connection_number',
            fieldLabel: 'Connection Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'amount',
            fieldLabel: 'Amount ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'zone',
            fieldLabel: 'Zone ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'email_address',
            fieldLabel: 'Email Address ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'pay_before',
            fieldLabel: 'Pay Before ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'bill_date',
            fieldLabel: 'Bill Date ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_invalidemailaddress();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_invalidemailaddressinfo(formPanel,rid);
}

});



}//launchForm()


function sms_invalidgeneraladdressForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_invalidgeneraladdress();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Invalid General SMS Contacts ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_invalidgeneraladdress'
			 },
			 {xtype:'hidden',
             name:'invalidgeneraladdress_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'recepient',
            fieldLabel: 'Recepient ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'phone_number',
            fieldLabel: 'Phone Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'message',
            fieldLabel: 'Message ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_invalidgeneraladdress();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_invalidgeneraladdressinfo(formPanel,rid);
}

});



}//launchForm()


function sms_messagereceivedForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_messagereceived();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update SMS Inbox ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_messagereceived'
			 },
			 {xtype:'hidden',
             name:'messagereceived_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'message_from',
            fieldLabel: 'Message From',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'message_message',
            fieldLabel: 'Message',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_messagereceived();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_messagereceivedinfo(formPanel,rid);
}

});



}//launchForm()


function sms_messagesendForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_messagesend();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Out box ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_messagesend'
			 },
			 {xtype:'hidden',
             name:'messagesend_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'messagesend_name',
            fieldLabel: 'Messagesend Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'reciepient',
            fieldLabel: 'Reciepient ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'message',
            fieldLabel: 'Message ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'status',
            fieldLabel: 'Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_messagesend();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_messagesendinfo(formPanel,rid);
}

});



}//launchForm()


function sms_processedemailForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbSms_billmonth', {
    extend: 'Ext.data.Model',
	fields:['billmonth_id','billmonth_name']
	});

var sms_billmonthdata = Ext.create('Ext.data.Store', {
    model: 'cmbSms_billmonth',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=sms_billmonth',
        reader: {
            type: 'json'
        }
    }
});

sms_billmonthdata.load();


Ext.define('cmbSms_billyear', {
    extend: 'Ext.data.Model',
	fields:['billyear_id','billyear_name']
	});

var sms_billyeardata = Ext.create('Ext.data.Store', {
    model: 'cmbSms_billyear',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=sms_billyear',
        reader: {
            type: 'json'
        }
    }
});

sms_billyeardata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_processedemail();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Sent Emails ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_processedemail'
			 },
			 {xtype:'hidden',
             name:'processedemail_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'email_address',
            fieldLabel: 'Email Address ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'connection_number',
            fieldLabel: 'Connection Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'message',
            fieldLabel: 'Message ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'billmonth_id',
	forceSelection:true,
    fieldLabel: 'Month',
    store: sms_billmonthdata,
    queryMode: 'local',
    displayField: 'billmonth_name',
    valueField: 'billmonth_id'
	},{
            xtype: 'textfield',
            name: 'zone',
            fieldLabel: 'Zone ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'billyear_id',
	forceSelection:true,
    fieldLabel: 'Year',
    store: sms_billyeardata,
    queryMode: 'local',
    displayField: 'billyear_name',
    valueField: 'billyear_id'
	}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_processedemail();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_processedemailinfo(formPanel,rid);
}

});



}//launchForm()


function sms_processedfailedemailForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbSms_billyear', {
    extend: 'Ext.data.Model',
	fields:['billyear_id','billyear_name']
	});

var sms_billyeardata = Ext.create('Ext.data.Store', {
    model: 'cmbSms_billyear',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=sms_billyear',
        reader: {
            type: 'json'
        }
    }
});

sms_billyeardata.load();


Ext.define('cmbSms_billmonth', {
    extend: 'Ext.data.Model',
	fields:['billmonth_id','billmonth_name']
	});

var sms_billmonthdata = Ext.create('Ext.data.Store', {
    model: 'cmbSms_billmonth',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=sms_billmonth',
        reader: {
            type: 'json'
        }
    }
});

sms_billmonthdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_processedfailedemail();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update   Emails Failed to Sent ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_processedfailedemail'
			 },
			 {xtype:'hidden',
             name:'processedfailedemail_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'email_address',
            fieldLabel: 'Email Address ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'connection_number',
            fieldLabel: 'Connection Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'message',
            fieldLabel: 'Message ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'billyear_id',
	forceSelection:true,
    fieldLabel: 'Year',
    store: sms_billyeardata,
    queryMode: 'local',
    displayField: 'billyear_name',
    valueField: 'billyear_id'
	},{
            xtype: 'textareafield',
            name: 'reason_failed',
            fieldLabel: 'Reason Failed ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'zone',
            fieldLabel: 'Zone ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'billmonth_id',
	forceSelection:true,
    fieldLabel: 'Month',
    store: sms_billmonthdata,
    queryMode: 'local',
    displayField: 'billmonth_name',
    valueField: 'billmonth_id'
	}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_processedfailedemail();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_processedfailedemailinfo(formPanel,rid);
}

});



}//launchForm()


function sms_processedgeneralsmsForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_processedgeneralsms();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update General SMS Outbox ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_processedgeneralsms'
			 },
			 {xtype:'hidden',
             name:'processedgeneralsms_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'phone_number',
            fieldLabel: 'Phone Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'recepient',
            fieldLabel: 'Recepient ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'message',
            fieldLabel: 'Message ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_processedgeneralsms();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_processedgeneralsmsinfo(formPanel,rid);
}

});



}//launchForm()


function sms_processedsmsForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_processedsms();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  Sent Bills ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_processedsms'
			 },
			 {xtype:'hidden',
             name:'processedsms_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'phone_number',
            fieldLabel: 'Phone Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'connection_number',
            fieldLabel: 'Connection Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'message',
            fieldLabel: 'Message ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_processedsms();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_processedsmsinfo(formPanel,rid);
}

});



}//launchForm()


function sms_receivedrqtsForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_receivedrqts();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update SMS Requests ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_receivedrqts'
			 },
			 {xtype:'hidden',
             name:'receivedrqts_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'message_from',
            fieldLabel: 'Message From ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'request_type',
            fieldLabel: 'Request Type ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'message_message',
            fieldLabel: 'Message Message ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_receivedrqts();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_receivedrqtsinfo(formPanel,rid);
}

});



}//launchForm()


function sms_scheduleForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbSms_smsmsgcust', {
    extend: 'Ext.data.Model',
	fields:['smsmsgcust_id','smsmsgcust_name']
	});

var sms_smsmsgcustdata = Ext.create('Ext.data.Store', {
    model: 'cmbSms_smsmsgcust',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=sms_smsmsgcust',
        reader: {
            type: 'json'
        }
    }
});

sms_smsmsgcustdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_schedule();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Schedule List ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_schedule'
			 },
			 {xtype:'hidden',
             name:'schedule_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'schedule_name',
            fieldLabel: 'Schedule Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'schedule_description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		},
   {
    xtype: 'combobox',
	name:'smsmsgcust_id',
	forceSelection:true,
    fieldLabel: 'Message Type',
    store: sms_smsmsgcustdata,
    queryMode: 'local',
    displayField: 'smsmsgcust_name',
    valueField: 'smsmsgcust_id'
	},{
            xtype: 'datefield',
            name: 'bill_date',
            fieldLabel: 'Bill Date ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'due_after',
            fieldLabel: 'Due After ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'file_brouwse',
            fieldLabel: 'File Brouwse ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_schedule();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_scheduleinfo(formPanel,rid);
}

});



}//launchForm()


function sms_schedulegeneralsmsForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_schedulegeneralsms();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update General SMS schedule ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_schedulegeneralsms'
			 },
			 {xtype:'hidden',
             name:'schedulegeneralsms_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'schedulegeneralsms_name',
            fieldLabel: 'Schedule',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'message',
            fieldLabel: 'Message',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'file_brouwse',
            fieldLabel: 'File Brouwse ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_schedulegeneralsms();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_schedulegeneralsmsinfo(formPanel,rid);
}

});



}//launchForm()


function sms_sendsmstogrpForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbSms_smsgroup', {
    extend: 'Ext.data.Model',
	fields:['smsgroup_id','smsgroup_name']
	});

var sms_smsgroupdata = Ext.create('Ext.data.Store', {
    model: 'cmbSms_smsgroup',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=sms_smsgroup',
        reader: {
            type: 'json'
        }
    }
});

sms_smsgroupdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_sendsmstogrp();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update  Sms to group ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_sendsmstogrp'
			 },
			 {xtype:'hidden',
             name:'sendsmstogrp_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'smsgroup_id',
	forceSelection:true,
    fieldLabel: 'Smsgroup Id ',
    store: sms_smsgroupdata,
    queryMode: 'local',
    displayField: 'smsgroup_name',
    valueField: 'smsgroup_id'
	},{
            xtype: 'textareafield',
            name: 'sms_message',
            fieldLabel: 'Sms Message ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'comment',
            fieldLabel: 'Comment ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_sendsmstogrp();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_sendsmstogrpinfo(formPanel,rid);
}

});



}//launchForm()


function sms_smscaptionsForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_smscaptions();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Sms captions ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_smscaptions'
			 },
			 {xtype:'hidden',
             name:'smscaptions_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'sms_tablelist',
            fieldLabel: 'Sms Tablelist ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'caption',
            fieldLabel: 'Caption ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_smscaptions();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_smscaptionsinfo(formPanel,rid);
}

});



}//launchForm()


function sms_smsgroupForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_smsgroup();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Create group ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_smsgroup'
			 },
			 {xtype:'hidden',
             name:'smsgroup_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'smsgroup_name',
            fieldLabel: 'Smsgroup Name ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: 'Description ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_smsgroup();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_smsgroupinfo(formPanel,rid);
}

});



}//launchForm()


function sms_smsgroupmemberForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmbSms_smsgroup', {
    extend: 'Ext.data.Model',
	fields:['smsgroup_id','smsgroup_name']
	});

var sms_smsgroupdata = Ext.create('Ext.data.Store', {
    model: 'cmbSms_smsgroup',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=sms_smsgroup',
        reader: {
            type: 'json'
        }
    }
});

sms_smsgroupdata.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_smsgroupmember();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Group member ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_smsgroupmember'
			 },
			 {xtype:'hidden',
             name:'smsgroupmember_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'smsgroup_id',
	forceSelection:true,
    fieldLabel: 'Smsgroup Id ',
    store: sms_smsgroupdata,
    queryMode: 'local',
    displayField: 'smsgroup_name',
    valueField: 'smsgroup_id'
	},{
            xtype: 'textfield',
            name: 'syowner',
            fieldLabel: 'Syowner ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'numberfield',
            name: 'syownerid',
            fieldLabel: 'Syownerid ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_smsgroupmember();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_smsgroupmemberinfo(formPanel,rid);
}

});



}//launchForm()


function sms_smsinvalidForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_smsinvalid();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Invalid Contacts ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_smsinvalid'
			 },
			 {xtype:'hidden',
             name:'smsinvalid_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'connection_number',
            fieldLabel: 'Connection Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'amount',
            fieldLabel: 'Amount ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'phone_number',
            fieldLabel: 'Phone Number ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'datefield',
            name: 'pay_before',
            fieldLabel: 'Pay Before ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'prev_reading',
            fieldLabel: 'Prev Reading ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'curr_reading',
            fieldLabel: 'Curr Reading ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'consumption',
            fieldLabel: 'Consumption ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_smsinvalid();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_smsinvalidinfo(formPanel,rid);
}

});



}//launchForm()


function sms_smsmsgcustForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_smsmsgcust();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update Customize SMS ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_smsmsgcust'
			 },
			 {xtype:'hidden',
             name:'smsmsgcust_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'smsmsgcust_name',
            fieldLabel: 'Message Type',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textareafield',
            name: 'message',
            fieldLabel: 'Message ',
            allowBlank: false,
            minLength: 1
        
		},{
            xtype: 'textfield',
            name: 'status',
            fieldLabel: 'Status ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_smsmsgcust();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_smsmsgcustinfo(formPanel,rid);
}

});



}//launchForm()


function sms_systemlockForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.define('cmb', {
    extend: 'Ext.data.Model',
	fields:['_id','_name']
	});

var data = Ext.create('Ext.data.Store', {
    model: 'cmb',
    proxy: {
        type: 'ajax',
        url : 'cmb.php?tbp=',
        reader: {
            type: 'json'
        }
    }
});

data.load();


Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_systemlock();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update System lock ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_systemlock'
			 },
			 {xtype:'hidden',
             name:'systemlock_id',
			 value:''
			 },
   {
    xtype: 'combobox',
	name:'status_id',
	forceSelection:true,
    fieldLabel: 'Status Id ',
    store: data,
    queryMode: 'local',
    displayField: '_name',
    valueField: '_id'
	}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_systemlock();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_systemlockinfo(formPanel,rid);
}

});



}//launchForm()


function sms_systemmodeForm(displayhere,loadtype,rid){

var obj=document.getElementById(displayhere);

obj.innerHTML='';



Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
        var formPanel = Ext.widget('form', {
        renderTo: displayhere,
		tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_systemmode();
											}
                }],
		resizable:true,
		closable:true,
        frame: true,
		url:'bodysave.php',
        width: 550,
        bodyPadding: 10,
        bodyBorder: true,
		wallpaper: '../sview/desktop/wallpapers/desk.jpg',
        wallpaperStretch: false,
        title: 'Update System mode ',

        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'none',
            /*invalidCls: '' 
			unset the invalidCls so individual fields do not get styled as invalid*/
        },

        /*
         * Listen for validity change on the entire form and update the combined error icon
         */
        listeners: {
            fieldvaliditychange: function() {
                this.updateErrorState();
            },
            fielderrorchange: function() {
                this.updateErrorState();
            }
        },

        updateErrorState: function() {
            var me = this,
                errorCmp, fields, errors;

            if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
                errorCmp = me.down('#formErrorState');
                fields = me.getForm().getFields();
                errors = [];
                fields.each(function(field) {
                    Ext.Array.forEach(field.getErrors(), function(error) {
                        errors.push({name: field.getFieldLabel(), error: error});
                    });
                });
                errorCmp.setErrors(errors);
                me.hasBeenDirty = true;
            }
        },

        items: [
		
		{xtype:'hidden',
             name:'t',
			 value:'sms_systemmode'
			 },
			 {xtype:'hidden',
             name:'systemmode_id',
			 value:''
			 },{
            xtype: 'textfield',
            name: 'current_mode',
            fieldLabel: 'Current Mode ',
            allowBlank: false,
            minLength: 1
        
		}], dockedItems: [{
            xtype: 'container',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            padding: '10 10 5',

            items: [{
                xtype: 'component',
                id: 'formErrorState',
                baseCls: 'form-error-state',
                flex: 1,
                validText: 'Form is valid',
                invalidText: 'Form has errors',
                tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for=><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

                getTip: function() {
                    var tip = this.tip;
                    if (!tip) {
                        tip = this.tip = Ext.widget('tooltip', {
                            target: this.el,
                            title: 'Error Details:',
                            autoHide: false,
                            anchor: 'top',
                            mouseOffset: [-11, -2],
                            closable: true,
                            constrainPosition: false,
                            cls: 'errors-tip'
                        });
                        tip.show();
                    }
                    return tip;
                },

                setErrors: function(errors) {
                    var me = this,
                        baseCls = me.baseCls,
                        tip = me.getTip();

                    errors = Ext.Array.from(errors);

                    // Update CSS class and tooltip content
                    if (errors.length) {
                        me.addCls(baseCls + '-invalid');
                        me.removeCls(baseCls + '-valid');
                        me.update(me.invalidText);
                        tip.setDisabled(false);
                        tip.update(me.tipTpl.apply(errors));
                    } else {
                        me.addCls(baseCls + '-valid');
                        me.removeCls(baseCls + '-invalid');
                        me.update(me.validText);
                        tip.setDisabled(true);
                        tip.hide();
                    }
                }
            }, 
			
			
	//now submit
	{
		xtype: 'button',
        text: 'Submit Data',
        handler: function() {
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    url: 'bodysave.php',
                    waitMsg: 'saving changes...',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', '' + o.result.savemsg + '"');
                    }
                });
            }
        }
    }
	///end of cols
		]
        }]
    });
	
	/*var win = Ext.create('Ext.Window', {
					 
        title: 'User Registration',
       // height: 700,
       //width: 800,
        layout: 'fit',
		autoScroll :true,
		items: formPanel,
		 tbar:[{
                    text:'Add Something muse',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                },'-',{
                    text:'View',
                    tooltip:'View Information Grid',
                    iconCls:'grid',
					handler:function(buttonObj, eventObj) { 
									///eventObj.click(eval(tablevalgrpArr[2]));
									gridViewsms_systemmode();
											}
                }
				]
    }).show();
	*/
	
if(loadtype=='updateload'){
loadsms_systemmodeinfo(formPanel,rid);
}

});



}//launchForm()

