import React from 'react';
import {AbsoluteFill, Composition, Img, interpolate, registerRoot, Still, useCurrentFrame} from 'remotion';
import {ArrowDown, ArrowRight, Boxes, CalendarClock, Check, ClipboardList, FileSpreadsheet, MapPin, Package, Search, TriangleAlert} from 'lucide-react';
import {Background, Eyebrow, Foot, NAVY, PAD, Produto, Support, Title, Top, WHITE, ease, kit, mute} from '../lib/NortePost';
import {ensurePostLoaded, FONT_POST as SANS, FONT_POST_MONO as MONO} from '../lib/fonts';

const LOGO = kit('01-logos/norte-estoque/horizontal/norte-estoque_horizontal_branco_transparente.png');
const W = 1080;
const H = 1350;

const Shell: React.FC<{n: number; tone: 'dark' | 'light' | 'product'; eyebrow: string; title: string; support: string; titleSize?: number; supportTop?: number; children: React.ReactNode}> = ({n, tone, eyebrow, title, support, titleSize = 72, supportTop = 466, children}) => (
  <Produto id="estoque">
    <AbsoluteFill>
      <Background tone={tone} id={`planilha-${n}`} />
      <Top n={n} total={7} tone={tone} />
      <Eyebrow tone={tone} top={190}>{eyebrow}</Eyebrow>
      <Title tone={tone} top={250} size={titleSize}>{title}</Title>
      <Support tone={tone} top={supportTop} width={890} size={28}>{support}</Support>
      {children}
      <Foot tone={tone} label="Norte Estoque" />
    </AbsoluteFill>
  </Produto>
);

const Spreadsheet: React.FC<{x?: number; y?: number; scale?: number; faded?: boolean}> = ({x=0,y=0,scale=1,faded=false}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={faded?.45:1}>
    <rect width="620" height="390" rx="18" fill="#FBFBFE" />
    <rect width="620" height="58" rx="18" fill="#E8EAF3" />
    <rect y="42" width="620" height="16" fill="#E8EAF3" />
    <circle cx="30" cy="29" r="7" fill="#168E9A"/><circle cx="54" cy="29" r="7" fill="#B9BCEB"/><circle cx="78" cy="29" r="7" fill="#D8D9E6"/>
    {[0,1,2,3,4].map((i)=><line key={`v${i}`} x1={150+i*94} y1="58" x2={150+i*94} y2="390" stroke="#D9DBE7" strokeWidth="2"/>)}
    {[0,1,2,3,4,5,6].map((i)=><g key={`r${i}`}><line x1="0" y1={105+i*40} x2="620" y2={105+i*40} stroke="#D9DBE7" strokeWidth="2"/><rect x="19" y={76+i*40} width={62+(i%3)*18} height="9" rx="4" fill="#AFB3C7"/><rect x="170" y={76+i*40} width={40+(i%2)*24} height="9" rx="4" fill={i===3?'#168E9A':'#AFB3C7'}/><rect x="274" y={76+i*40} width={54+(i%2)*18} height="9" rx="4" fill="#D0D2DF"/><rect x="378" y={76+i*40} width={42+(i%3)*15} height="9" rx="4" fill="#D0D2DF"/><rect x="476" y={76+i*40} width="92" height="9" rx="4" fill="#D0D2DF"/></g>)}
    <rect x="154" y="170" width="94" height="40" fill="rgba(22,142,154,.12)" stroke="#168E9A" strokeWidth="3"/>
  </g>
);

const Cover: React.FC = () => {
  ensurePostLoaded();
  return <Produto id="estoque"><AbsoluteFill><Background tone="product" id="planilha-cover"/><Img src={LOGO} style={{position:'absolute',left:PAD,top:76,height:82,width:'auto'}}/><span style={{position:'absolute',right:PAD,top:96,fontFamily:MONO,fontSize:22,color:mute('product')}}>01/07</span>
    <Eyebrow tone="product" top={305}>NORTE ESTOQUE</Eyebrow><Title tone="product" top={365} size={82}>Sua planilha acompanha o ritmo do estoque?</Title><Support tone="product" top={575} width={860} size={30}>Uma visão visual do que acontece quando as atualizações manuais tentam acompanhar a operação.</Support>
    <div style={{position:'absolute',left:115,top:760,width:850,height:410,transform:'rotate(-3deg)',filter:'drop-shadow(0 26px 28px rgba(10,20,45,.28))'}}><svg viewBox="0 0 680 430" width="100%" height="100%"><Spreadsheet x={30} y={15} scale={1.0}/><path d="M95 344h490" stroke="#F0CF8B" strokeWidth="12" strokeLinecap="round"/><path d="M128 371h405" stroke="rgba(251,251,254,.55)" strokeWidth="4" strokeLinecap="round"/><circle cx="557" cy="343" r="33" fill="#F0CF8B"/><TriangleAlert x={536} y={322} size={42} color={NAVY}/></svg></div><Foot tone="product" label="Norte Estoque"/></AbsoluteFill></Produto>;
};

const Versions: React.FC = () => <Shell n={2} tone="light" eyebrow="ARQUIVOS EM PARALELO" title="Qual versão tem o saldo certo?" support="Cópias, abas e atualizações diferentes podem deixar a equipe sem uma referência comum.">
  <div style={{position:'absolute',left:120,top:700,width:840,height:400}}>
    {[0,1,2].map((i)=><div key={i} style={{position:'absolute',left:i*90,top:i*34,width:690,height:310,background:'#FBFBFE',borderRadius:18,border:'1px solid #D9DBE7',boxShadow:'0 20px 35px rgba(20,22,58,.1)',transform:`rotate(${(i-1)*3}deg)`,padding:28,boxSizing:'border-box'}}>
      <div style={{display:'flex',alignItems:'center',gap:14,color:NAVY,fontFamily:SANS,fontSize:20,fontWeight:700}}><FileSpreadsheet size={30} color="#168E9A"/>{['Estoque','Estoque atualizado','Estoque atualizado final'][i]}</div>
      <div style={{marginTop:26,display:'grid',gap:16}}>{[0,1,2,3].map((r)=><div key={r} style={{height:22,display:'flex',gap:12,alignItems:'center'}}><div style={{height:8,width:110,background:'#D5D7E2',borderRadius:4}}/><div style={{height:8,width:80+r*14,background:r===2&&i===1?'#E5A75F':'#D5D7E2',borderRadius:4}}/><div style={{height:8,width:95,background:'#D5D7E2',borderRadius:4}}/></div>)}</div>
    </div>)}
    <div style={{position:'absolute',right:8,bottom:0,width:110,height:110,borderRadius:60,background:'#168E9A',border:'8px solid #F5F5F9',display:'grid',placeItems:'center',color:WHITE}}><CircleDiff/></div>
  </div>
</Shell>;
const CircleDiff: React.FC = () => <span style={{fontSize:62,fontFamily:SANS,fontWeight:700}}>?</span>;

const Delayed: React.FC<{frame?:number}> = ({frame}) => {
  const lift=frame===undefined?1:interpolate(frame,[8,46],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
  return <Shell n={3} tone="dark" eyebrow="ROTINA ADIADA" title="A atualização fica para depois" support="Enquanto a operação continua, as alterações se acumulam para alguém registrar mais tarde.">
    <div style={{position:'absolute',left:130,top:700,width:820,height:400}}>
      <div style={{position:'absolute',left:0,top:18,width:300,height:300,border:'2px solid rgba(251,251,254,.4)',borderRadius:25,display:'grid',placeItems:'center',color:'#7BD8DF'}}><CalendarClock size={130} strokeWidth={1.3}/></div>
      <ArrowRight style={{position:'absolute',left:332,top:125,color:'#7BD8DF'}} size={70}/>
      {[0,1,2].map((i)=><div key={i} style={{position:'absolute',left:440+i*12,top:50+(2-i)*52+(1-lift)*80,width:280-i*14,height:120,borderRadius:14,background:i===2?'#FBFBFE':'#D9DBE7',boxShadow:'0 16px 24px rgba(0,0,0,.2)',transform:`rotate(${(i-1)*3}deg)`,padding:20,boxSizing:'border-box',opacity:.3+lift*.7}}><div style={{display:'flex',gap:12,alignItems:'center',color:NAVY,fontFamily:SANS,fontWeight:700,fontSize:16}}><ClipboardList size={24}/>PENDENTE</div><div style={{marginTop:18,height:7,width:'78%',background:'#AEB2C3',borderRadius:4}}/><div style={{marginTop:12,height:7,width:'55%',background:'#D1D3DF',borderRadius:4}}/></div>)}
      <div style={{position:'absolute',left:495,bottom:0,color:'#7BD8DF',fontFamily:SANS,fontSize:19,fontWeight:700,letterSpacing:2}}>REGISTROS ACUMULADOS</div>
    </div>
  </Shell>;
};
const DelayedAnim: React.FC = () => <Delayed frame={useCurrentFrame()}/>;

const Reconcile: React.FC = () => <Shell n={4} tone="product" eyebrow="CONFERÊNCIA MANUAL" title="A equipe precisa conferir tudo de novo" support="Quando a planilha não acompanha as mudanças, a contagem volta para o centro da rotina.">
  <div style={{position:'absolute',left:120,top:690,width:840,height:420,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
    <div style={{width:300,height:340,background:'#F8F5EB',borderRadius:8,boxShadow:'0 22px 34px rgba(10,20,45,.22)',transform:'rotate(-5deg)',padding:24,boxSizing:'border-box'}}><div style={{fontFamily:SANS,fontSize:16,fontWeight:700,color:NAVY,letterSpacing:1}}>PLANILHA</div><div style={{marginTop:22,display:'grid',gap:22}}>{[0,1,2,3,4].map(i=><div key={i} style={{display:'flex',alignItems:'center',gap:10,borderBottom:'1px solid #D7D2C5',paddingBottom:10}}><span style={{width:11,height:11,border:'2px solid #9BA0AF',borderRadius:2}}/><div style={{height:8,width:110+i%3*24,background:'#BEC2CF',borderRadius:4}}/><div style={{height:8,width:45,background:'#DADCE5',borderRadius:4}}/></div>)}</div></div>
    <div style={{textAlign:'center',color:WHITE}}><Search size={62}/><div style={{marginTop:15,fontFamily:SANS,fontSize:16,fontWeight:700,letterSpacing:1}}>CONFERIR</div></div>
    <div style={{width:310,height:330,borderBottom:'12px solid rgba(251,251,254,.75)',borderLeft:'8px solid rgba(251,251,254,.75)',borderRight:'8px solid rgba(251,251,254,.75)',position:'relative',display:'flex',alignItems:'end',justifyContent:'space-evenly',paddingBottom:10,boxSizing:'border-box'}}>{[0,1,2,3].map(i=><div key={i} style={{width:52,height:110+i%2*48,background:['#F4D998','#E9C982','#F8E6BC','#D6B879'][i],borderRadius:5,display:'grid',placeItems:'center',color:NAVY}}><Package size={28}/></div>)}<div style={{position:'absolute',left:0,right:0,top:140,height:8,background:'rgba(251,251,254,.75)'}}/></div>
  </div>
</Shell>;

const FindItem: React.FC<{frame?:number}> = ({frame}) => {
  const p=frame===undefined?1:interpolate(frame,[10,48],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
  return <Shell n={5} tone="light" eyebrow="BUSCA E REPOSIÇÃO" title="A dúvida vira mais uma tarefa" support="Sem uma visão confiável, localizar e decidir o que fazer exige novas checagens.">
    <div style={{position:'absolute',left:130,top:700,width:820,height:410}}>
      <div style={{position:'absolute',left:0,top:25,width:310,height:310,borderRadius:18,background:'#E6E9F1',padding:24,boxSizing:'border-box'}}><div style={{fontFamily:SANS,fontWeight:700,color:NAVY,fontSize:17,letterSpacing:1.2}}>PROCURAR PRODUTO</div><div style={{marginTop:26,display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>{[0,1,2,3].map(i=><div key={i} style={{height:90,borderRadius:12,background:i===2?'rgba(22,142,154,.15)':'#D3D7E2',display:'grid',placeItems:'center',color:i===2?'#168E9A':'#9197AA'}}><Package size={39}/></div>)}</div></div>
      <svg style={{position:'absolute',left:340,top:90}} width="190" height="160" viewBox="0 0 190 160"><path d="M8 82 C55 10 122 145 180 72" fill="none" stroke="#168E9A" strokeWidth="5" strokeDasharray="8 10"/><circle cx={25+155*p} cy={78-7*Math.sin(p*Math.PI)} r="17" fill="#E7BD72" stroke={NAVY} strokeWidth="3"/></svg>
      <div style={{position:'absolute',right:0,top:48,width:270,height:270,borderRadius:135,border:'3px solid #168E9A',display:'grid',placeItems:'center',color:'#168E9A'}}><MapPin size={110} strokeWidth={1.35}/><div style={{position:'absolute',bottom:25,fontFamily:SANS,fontSize:17,fontWeight:700,letterSpacing:1.3,color:NAVY}}>LOCAL?</div></div>
    </div>
  </Shell>;
};
const FindItemAnim: React.FC = () => <FindItem frame={useCurrentFrame()}/>;

const Routine: React.FC = () => <Shell n={6} tone="dark" eyebrow="UM FLUXO MAIS CLARO" title="O controle precisa acompanhar a operação" support="Inventário, identificação e movimentações organizados em uma rotina que a equipe consegue acompanhar." titleSize={66} supportTop={430}>
  <div style={{position:'absolute',left:105,top:700,width:870,height:390,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
    {[{icon:<ClipboardList size={68}/>,label:'INVENTÁRIO'},{icon:<Package size={68}/>,label:'IDENTIFICAÇÃO'},{icon:<MapPin size={68}/>,label:'MOVIMENTAÇÃO'}].map((item,i)=><React.Fragment key={item.label}><div style={{width:245,height:250,borderRadius:20,border:'2px solid rgba(123,216,223,.8)',background:'rgba(22,142,154,.14)',display:'grid',placeItems:'center',alignContent:'center',gap:20,color:'#7BD8DF'}}>{item.icon}<span style={{fontFamily:SANS,fontWeight:700,fontSize:16,letterSpacing:1,color:WHITE}}>{item.label}</span></div>{i<2&&<ArrowRight size={36} color="#7BD8DF"/>}</React.Fragment>)}
  </div>
</Shell>;

const Close: React.FC = () => {ensurePostLoaded();return <Produto id="estoque"><AbsoluteFill><Background tone="product" id="planilha-close"/><Img src={LOGO} style={{position:'absolute',left:PAD,top:78,height:84,width:'auto'}}/><span style={{position:'absolute',right:PAD,top:96,fontFamily:MONO,fontSize:22,color:mute('product')}}>07/07</span>
  <Eyebrow tone="product" top={350}>NORTE ESTOQUE</Eyebrow><Title tone="product" top={420} size={78}>Mais clareza para cuidar do estoque</Title><Support tone="product" top={630} width={860} size={30}>Conheça um jeito de acompanhar os produtos e as movimentações da sua operação.</Support>
  <div style={{position:'absolute',left:PAD,right:PAD,top:850,height:1,background:'rgba(251,251,254,.28)'}}/><div style={{position:'absolute',left:PAD,right:PAD,top:910,display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:SANS,fontWeight:700,fontSize:21,letterSpacing:1.6,color:WHITE}}><span>ACESSE O LINK DA BIO</span><span style={{background:WHITE,color:NAVY,borderRadius:999,padding:'20px 26px'}}>NORTE ESTOQUE →</span></div>
  <div style={{position:'absolute',right:130,bottom:185,color:'rgba(251,251,254,.13)'}}><Boxes size={170} strokeWidth={1.1}/></div><Foot tone="product" last label="Norte Estoque"/></AbsoluteFill></Produto>;};

export const PlanilhaRoot: React.FC = () => <>
  <Still id="Planilha01" component={Cover} width={W} height={H}/>
  <Still id="Planilha02" component={Versions} width={W} height={H}/>
  <Still id="Planilha03" component={Delayed} width={W} height={H}/>
  <Composition id="Planilha03Animada" component={DelayedAnim} width={W} height={H} fps={30} durationInFrames={90}/>
  <Still id="Planilha04" component={Reconcile} width={W} height={H}/>
  <Still id="Planilha05" component={FindItem} width={W} height={H}/>
  <Composition id="Planilha05Animada" component={FindItemAnim} width={W} height={H} fps={30} durationInFrames={90}/>
  <Still id="Planilha06" component={Routine} width={W} height={H}/>
  <Still id="Planilha07" component={Close} width={W} height={H}/>
</>;

registerRoot(PlanilhaRoot);
