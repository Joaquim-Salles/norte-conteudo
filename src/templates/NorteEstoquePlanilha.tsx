import React from 'react';
import {AbsoluteFill, Composition, Img, interpolate, registerRoot, staticFile, Still, useCurrentFrame} from 'remotion';
import {ArrowRight, Boxes, CalendarClock, Check, ClipboardList, FileSpreadsheet, MapPin, Package, QrCode, Search} from 'lucide-react';
import {Background, Eyebrow, Foot, NAVY, PAD, Produto, Support, Title, Top, WHITE, ease, kit, mute} from '../lib/NortePost';
import {ensurePostLoaded, FONT_POST as SANS, FONT_POST_MONO as MONO} from '../lib/fonts';

const LOGO = kit('01-logos/norte-estoque/horizontal/norte-estoque_horizontal_branco_transparente.png');
const TELA_RESUMO = kit('08-recursos/telas-oficiais/estoque/d-home.png');
const W = 1080;
const H = 1350;
const COVER_BG = staticFile('norte-estoque-planilha-cover-v2.png');

const Shell: React.FC<{n: number; tone: 'dark' | 'light' | 'product'; eyebrow: string; title: string; support: string; titleSize?: number; supportTop?: number; children: React.ReactNode}> = ({n, tone, eyebrow, title, support, titleSize = 72, supportTop = 466, children}) => (
  <Produto id="estoque">
    <AbsoluteFill>
      <Background tone={tone} id={`planilha-${n}`} />
      <Top n={n} total={10} tone={tone} />
      <Eyebrow tone={tone} top={190}>{eyebrow}</Eyebrow>
      <Title tone={tone} top={250} size={titleSize}>{title}</Title>
      <Support tone={tone} top={supportTop} width={890} size={28}>{support}</Support>
      {children}
      <Foot tone={tone} label="Norte Estoque" />
    </AbsoluteFill>
  </Produto>
);

const Cover: React.FC = () => {
  ensurePostLoaded();
  return <Produto id="estoque"><AbsoluteFill>
    <Img src={COVER_BG} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center'}}/>
    <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(20,22,58,.82) 0%,rgba(20,22,58,.62) 30%,rgba(20,22,58,.48) 48%,rgba(20,22,58,.18) 68%,rgba(20,22,58,.87) 100%)'}}/>
    <AbsoluteFill style={{background:'radial-gradient(ellipse 88% 28% at 50% 100%,rgba(22,142,154,.55),transparent 78%),linear-gradient(105deg,rgba(22,142,154,.16),transparent 48%)'}}/>
    <Img src={LOGO} style={{position:'absolute',left:PAD,top:76,height:82,width:'auto'}}/><span style={{position:'absolute',right:PAD,top:96,fontFamily:MONO,fontSize:22,color:WHITE}}>01/10</span>
    <Eyebrow tone="product" top={318}>NORTE ESTOQUE</Eyebrow><Title tone="product" top={378} size={80}>Até quando sua equipe vai conferir o estoque na planilha?</Title><Support tone="product" top={668} width={860} size={30}>Uma visão do que acontece quando as atualizações manuais tentam acompanhar a operação.</Support>
    <Foot tone="product" label="Norte Estoque"/>
  </AbsoluteFill></Produto>;
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

const QrGrid: React.FC = () => {
  const cells=Array.from({length:441},(_,i)=>({r:Math.floor(i/21),c:i%21})).filter(({r,c})=>{
    const finder=(x:number,y:number)=>r>=y&&r<y+7&&c>=x&&c<x+7;
    if(finder(0,0)||finder(14,0)||finder(0,14)) return false;
    return ((r*7+c*11+r*c)%5)<2;
  });
  const finder=(x:number,y:number)=><g transform={`translate(${x} ${y})`}><rect width="7" height="7" fill={NAVY}/><rect x="1" y="1" width="5" height="5" fill="white"/><rect x="2" y="2" width="3" height="3" fill={NAVY}/></g>;
  return <svg viewBox="-1 -1 23 23" width="100%" height="100%" shapeRendering="crispEdges"><rect x="-1" y="-1" width="23" height="23" fill="white"/>{cells.map(({r,c})=><rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill={NAVY}/>)}{finder(0,0)}{finder(14,0)}{finder(0,14)}</svg>;
};

const QrScan: React.FC<{frame?:number}> = ({frame}) => {
  const p=frame===undefined?1:interpolate(frame,[8,58],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
  return <Shell n={7} tone="product" eyebrow="INVENTÁRIO COM QR CODE" title="Conte o produto no próprio estoque" support="A leitura do QR Code leva a equipe direto ao inventário para registrar a contagem.">
    <div style={{position:'absolute',left:118,top:695,width:844,height:455,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div style={{position:'relative',width:370,height:350,borderRadius:20,background:'linear-gradient(140deg,#F5E6C4,#DABF87)',boxShadow:'0 24px 38px rgba(8,14,40,.3)',padding:26,boxSizing:'border-box',border:'1px solid rgba(255,255,255,.7)'}}>
        <div style={{height:26,width:180,background:'rgba(20,22,58,.16)',borderRadius:6}}/><div style={{position:'absolute',left:100,top:78,width:166,height:212,background:'#F7F8FC',borderRadius:12,boxShadow:'0 12px 28px rgba(20,22,58,.2)',padding:16,boxSizing:'border-box'}}><div style={{height:124,width:124,margin:'0 auto'}}><QrGrid/></div><div style={{marginTop:12,textAlign:'center',fontFamily:MONO,fontSize:12,fontWeight:700,color:NAVY,letterSpacing:1}}>ITEM DE ESTOQUE</div></div>
        <div style={{position:'absolute',left:28,right:28,bottom:26,height:14,background:'rgba(20,22,58,.14)',borderRadius:8}}/><div style={{position:'absolute',top:65,left:78,width:210,height:235,border:`3px solid rgba(251,251,254,${.2+.75*p})`,borderRadius:12}}/>
      </div>
      <div style={{position:'relative',width:270,height:400,borderRadius:36,background:'#11142F',border:'5px solid #323858',boxShadow:'0 26px 42px rgba(8,14,40,.35)',padding:14,boxSizing:'border-box'}}>
        <div style={{position:'absolute',top:8,left:'40%',width:'20%',height:10,borderRadius:10,background:'#252945'}}/><div style={{position:'relative',marginTop:18,height:335,borderRadius:22,overflow:'hidden',background:'linear-gradient(145deg,#193C54,#10142D)',display:'grid',placeItems:'center'}}>
          <div style={{width:125,height:125,opacity:.72}}><QrGrid/></div><div style={{position:'absolute',left:20,right:20,top:40+240*p,height:3,background:'#73E1E7',boxShadow:'0 0 18px #73E1E7'}}/><div style={{position:'absolute',inset:35,border:`2px solid rgba(115,225,231,${.45+.5*p})`,borderRadius:14}}/>
          {p>.85&&<div style={{position:'absolute',right:18,bottom:18,width:44,height:44,borderRadius:22,background:'#168E9A',display:'grid',placeItems:'center',color:WHITE}}><Check size={27}/></div>}
        </div>
      </div>
    </div>
  </Shell>;
};
const QrScanAnim: React.FC = () => <QrScan frame={useCurrentFrame()}/>;

const ProductId: React.FC = () => <Shell n={8} tone="light" eyebrow="IDENTIFICAÇÃO DO PRODUTO" title="Cada item fica mais fácil de reconhecer" support="A identificação acompanha o produto e ajuda a equipe a consultar seus dados no estoque.">
  <div style={{position:'absolute',left:150,top:705,width:780,height:405,display:'flex',alignItems:'center',justifyContent:'center',gap:70}}>
    <div style={{width:260,height:300,position:'relative',display:'grid',placeItems:'center'}}><div style={{position:'absolute',bottom:24,width:210,height:42,borderRadius:'50%',background:'rgba(20,22,58,.14)'}}/><div style={{position:'relative',width:158,height:250,borderRadius:'42px 42px 28px 28px',background:'linear-gradient(90deg,#E5C77E,#F2DDAA 42%,#C6A65C)',border:'3px solid #A88A4C',boxShadow:'0 18px 24px rgba(20,22,58,.16)'}}><div style={{position:'absolute',left:48,right:48,top:-19,height:27,borderRadius:'8px 8px 2px 2px',background:'#B59555'}}/><div style={{position:'absolute',left:22,right:22,top:86,height:100,borderRadius:8,background:'#FBFBFE',border:'1px solid #D9DBE7',display:'grid',placeItems:'center',color:NAVY}}><QrCode size={46}/><span style={{fontFamily:MONO,fontSize:9,letterSpacing:1}}>PRODUTO</span></div></div></div>
    <div style={{width:390,height:330,background:'#FBFBFE',borderRadius:18,border:'1px solid #D9DBE7',boxShadow:'0 24px 36px rgba(20,22,58,.1)',padding:26,boxSizing:'border-box'}}><div style={{fontFamily:SANS,fontWeight:700,fontSize:18,letterSpacing:1.3,color:'#168E9A'}}>IDENTIFICAÇÃO</div><div style={{marginTop:28,display:'grid',gap:22}}>{['PRODUTO','LOTE','VALIDADE'].map((row,i)=><div key={row} style={{borderBottom:'1px solid #D9DBE7',paddingBottom:14}}><div style={{fontFamily:MONO,fontSize:13,letterSpacing:1.4,color:'#686C83'}}>{row}</div><div style={{marginTop:10,height:10,width:[230,170,190][i],borderRadius:5,background:i===0?'#AEB3C4':'#D9DBE7'}}/></div>)}</div></div>
  </div>
</Shell>;

const TransferScene: React.FC<{frame?:number}> = ({frame}) => {
  const p=frame===undefined?1:interpolate(frame,[10,62],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
  const x=280+430*p;
  return <Shell n={9} tone="dark" eyebrow="MOVIMENTAÇÃO REGISTRADA" title="Mudou de local? Registre a transferência" support="A equipe acompanha o produto da origem ao destino dentro do controle do estoque.">
    <div style={{position:'absolute',left:95,top:715,width:890,height:390}}>
      {[{x:0,label:'ORIGEM'},{x:590,label:'DESTINO'}].map(({x:sx,label})=><div key={label} style={{position:'absolute',left:sx,top:25,width:290,height:295,borderRadius:18,border:'2px solid rgba(251,251,254,.34)',background:'rgba(251,251,254,.07)',padding:22,boxSizing:'border-box'}}><div style={{display:'flex',gap:12,alignItems:'center',fontFamily:SANS,fontWeight:700,fontSize:16,letterSpacing:1.3,color:'#7BD8DF'}}><MapPin size={26}/>{label}</div><div style={{position:'absolute',left:22,right:22,top:86,height:6,borderRadius:3,background:'rgba(251,251,254,.55)'}}/><div style={{position:'absolute',left:22,right:22,bottom:28,height:7,borderRadius:3,background:'rgba(251,251,254,.55)'}}/><div style={{position:'absolute',left:35,right:35,top:107,bottom:42,display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>{[0,1,2,3].map(i=><div key={i} style={{borderRadius:10,background:'rgba(251,251,254,.08)',display:'grid',placeItems:'center',color:'rgba(251,251,254,.5)'}}><Package size={30}/></div>)}</div></div>)}
      <svg style={{position:'absolute',left:270,top:124}} width="350" height="130" viewBox="0 0 350 130"><path d="M0 65 H350" stroke="rgba(123,216,223,.48)" strokeWidth="3" strokeDasharray="8 10"/><path d={`M${Math.min(350,p*350)} 65 H350`} stroke="#7BD8DF" strokeWidth="5"/></svg>
      <div style={{position:'absolute',left:x,top:153,width:64,height:64,transform:'translate(-50%,-50%)',borderRadius:13,background:'#F1D594',display:'grid',placeItems:'center',color:NAVY,boxShadow:'0 12px 18px rgba(0,0,0,.28)'}}><Package size={38}/></div>
      {p>.88&&<div style={{position:'absolute',right:24,bottom:-4,display:'flex',alignItems:'center',gap:10,color:'#7BD8DF',fontFamily:SANS,fontWeight:700,fontSize:15,letterSpacing:1.4}}><Check size={22}/>TRANSFERÊNCIA REGISTRADA</div>}
    </div>
  </Shell>;
};
const TransferAnim: React.FC = () => <TransferScene frame={useCurrentFrame()}/>;

const Transition: React.FC = () => <Shell n={5} tone="dark" eyebrow="MAS TEM COMO RESOLVER" title="Organize essa rotina com o Norte Estoque" titleSize={64} support="Inventários, identificação de produtos e movimentações em um fluxo de controle.">
  <div style={{position:'absolute',left:125,top:730,width:830,height:340,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
    <div style={{width:310,height:270,borderRadius:16,background:'#FBFBFE',boxShadow:'0 22px 36px rgba(0,0,0,.2)',padding:22,boxSizing:'border-box',transform:'rotate(-2deg)'}}>
      <div style={{display:'flex',alignItems:'center',gap:10,fontFamily:MONO,fontSize:13,fontWeight:700,letterSpacing:1,color:NAVY}}><FileSpreadsheet size={20} color="#168E9A"/>PLANILHA</div>
      <div style={{marginTop:22,display:'grid',gap:17}}>{[0,1,2,3].map((i)=><div key={i} style={{display:'flex',gap:10,alignItems:'center',height:22,borderBottom:'1px solid #E3E5EC'}}><div style={{width:92,height:7,borderRadius:4,background:'#D0D3DE'}}/><div style={{width:65+i*8,height:7,borderRadius:4,background:i===2?'#E0B360':'#D0D3DE'}}/><div style={{width:48,height:7,borderRadius:4,background:'#E1E3E9'}}/></div>)}</div>
    </div>
    <ArrowRight size={62} color="#7BD8DF" strokeWidth={1.8}/>
    <div style={{width:340,height:270,borderRadius:20,border:'2px solid rgba(251,251,254,.65)',background:'rgba(251,251,254,.1)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:24,boxShadow:'0 20px 36px rgba(0,0,0,.13)'}}>
      <Img src={LOGO} style={{width:220,height:'auto'}}/>
      <div style={{display:'flex',gap:10}}>{['INVENTÁRIO','MOVIMENTAÇÃO'].map((label)=><span key={label} style={{borderRadius:999,padding:'9px 12px',background:'rgba(251,251,254,.14)',fontFamily:MONO,fontSize:9,fontWeight:700,letterSpacing:.8,color:WHITE}}>{label}</span>)}</div>
    </div>
  </div>
</Shell>;

const ProductScreen: React.FC = () => <Shell n={6} tone="light" eyebrow="VISÃO GERAL DO ESTOQUE" title="Saiba o que pede atenção" support="Acompanhe produtos, alertas e tarefas da operação em uma visão única do estoque.">
  <div style={{position:'absolute',left:105,top:695,width:870,height:445,background:'#F7F8FC',borderRadius:18,border:'9px solid #17182D',boxShadow:'0 30px 50px rgba(20,22,58,.2)',overflow:'hidden'}}><Img src={TELA_RESUMO} style={{display:'block',width:'100%',height:'100%',objectFit:'cover',objectPosition:'left top'}}/></div>
</Shell>;

const Close: React.FC = () => {ensurePostLoaded();return <Produto id="estoque"><AbsoluteFill><Background tone="product" id="planilha-close"/><Img src={LOGO} style={{position:'absolute',left:PAD,top:78,height:84,width:'auto'}}/><span style={{position:'absolute',right:PAD,top:96,fontFamily:MONO,fontSize:22,color:mute('product')}}>10/10</span>
  <Eyebrow tone="product" top={350}>NORTE ESTOQUE</Eyebrow><Title tone="product" top={420} size={78}>Mais clareza para cuidar do estoque</Title><Support tone="product" top={630} width={860} size={30}>Conheça um jeito de acompanhar os produtos e as movimentações da sua operação.</Support>
  <div style={{position:'absolute',left:PAD,right:PAD,top:850,height:1,background:'rgba(251,251,254,.28)'}}/><div style={{position:'absolute',left:PAD,right:PAD,top:910,display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:SANS,fontWeight:700,fontSize:21,letterSpacing:1.6,color:WHITE}}><span>ACESSE O LINK DA BIO</span><span style={{background:WHITE,color:NAVY,borderRadius:999,padding:'20px 26px'}}>NORTE ESTOQUE →</span></div>
  <div style={{position:'absolute',right:130,bottom:185,color:'rgba(251,251,254,.13)'}}><Boxes size={170} strokeWidth={1.1}/></div><Foot tone="product" last label="Norte Estoque"/></AbsoluteFill></Produto>;};

export const PlanilhaRoot: React.FC = () => <>
  <Still id="Planilha01" component={Cover} width={W} height={H}/>
  <Still id="Planilha02" component={Versions} width={W} height={H}/>
  <Still id="Planilha03" component={Delayed} width={W} height={H}/>
  <Composition id="Planilha03Animada" component={DelayedAnim} width={W} height={H} fps={30} durationInFrames={90}/>
  <Still id="Planilha04" component={Reconcile} width={W} height={H}/>
  <Still id="Planilha05" component={Transition} width={W} height={H}/>
  <Still id="Planilha06" component={ProductScreen} width={W} height={H}/>
  <Still id="Planilha07" component={QrScan} width={W} height={H}/>
  <Composition id="Planilha07Animada" component={QrScanAnim} width={W} height={H} fps={30} durationInFrames={90}/>
  <Still id="Planilha08" component={ProductId} width={W} height={H}/>
  <Still id="Planilha09" component={TransferScene} width={W} height={H}/>
  <Composition id="Planilha09Animada" component={TransferAnim} width={W} height={H} fps={30} durationInFrames={90}/>
  <Still id="Planilha10" component={Close} width={W} height={H}/>
</>;

registerRoot(PlanilhaRoot);
