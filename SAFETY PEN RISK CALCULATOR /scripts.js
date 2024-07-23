function toggleSymptom(id) {
    const element = document.getElementById(id);
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

function calculateRisk() {
    const age = document.getElementById('age').value;
    const indexPenicillin = document.getElementById('indexPenicillin').value;
    const antibiotic = document.getElementById('antibiotic').value;
    const reactionTime = document.getElementById('reactionTime').value;
    const generalSymptoms = Array.from(document.querySelectorAll('select[name="generalSymptoms"] option:checked')).map(el => el.value);
    const respiratorySymptoms = Array.from(document.querySelectorAll('select[name="respiratorySymptoms"] option:checked')).map(el => el.value);
    const cardioSymptoms = Array.from(document.querySelectorAll('select[name="cardioSymptoms"] option:checked')).map(el => el.value);
    const cnsSymptoms = Array.from(document.querySelectorAll('select[name="cnsSymptoms"] option:checked')).map(el => el.value);
    const anaphylaxis = [...generalSymptoms, ...respiratorySymptoms, ...cardioSymptoms, ...cnsSymptoms];
    const cutaneous = Array.from(document.querySelectorAll('input[name="cutaneous"]:checked')).map(el => el.value);
    const rashDuration = document.getElementById('rashDuration').value;
    const adrenaline = document.getElementById('adrenaline').value;
    const redFlagConditions = Array.from(document.querySelectorAll('input[name="redFlagConditions"]:checked')).map(el => el.value);
    const comorbidities = Array.from(document.querySelectorAll('input[name="comorbidities"]:checked')).map(el => el.value);
    const gastrointestinalSymptoms = document.getElementById('gastrointestinalSymptoms').value;
    const thrush = document.getElementById('thrush').value;
    const otherAdverseEvent = document.getElementById('otherAdverseEvent').value;
    const toleratedCulpritDrug = document.getElementById('toleratedCulpritDrug').value;

    let risk = 'Low risk';
    let recommendation = 'Oral antibiotic, challenge with the same. Start with 1/10th dose and monitor for 20 minutes; full dose if no reaction and monitor for 1 hour.';

    // Check for high-risk factors
    if (anaphylaxis.includes('throat') || anaphylaxis.includes('breathing') || anaphylaxis.includes('wheeze') || 
        anaphylaxis.includes('cannotRememberGeneral') || anaphylaxis.includes('cannotRememberRespiratory') || 
        anaphylaxis.includes('cannotRememberCardio') || anaphylaxis.includes('cannotRememberCNS') ||
        adrenaline === 'yes' || 
        redFlagConditions.includes('scar') || redFlagConditions.includes('organInvolvement') || redFlagConditions.includes('ulceration') || 
        redFlagConditions.includes('peeling') || redFlagConditions.includes('mucosal') || redFlagConditions.includes('cannotRememberRedFlag') ||
        comorbidities.includes('asthma') || comorbidities.includes('cardiorespiratory') || comorbidities.includes('smoker')) {
        risk = 'High risk';
        recommendation = 'Refer for assessment by a drug allergy specialist.';
    }

    // Check age and reaction time
    if (age === 'under16') {
        if (reactionTime === 'within1year') {
            risk = 'High risk';
            recommendation = 'Refer for assessment by a drug allergy specialist.';
        } else if (reactionTime === 'morethan1year' && risk !== 'High risk') {
            risk = 'Low risk';
            recommendation = 'Oral antibiotic, challenge with the same. Start with 1/10th dose and monitor for 20 minutes; full dose if no reaction and monitor for 1 hour.';
        }
    } else if (age === 'over16') {
        if (reactionTime === 'within1year' || reactionTime === 'morethan1year') {
            risk = 'High risk';
            recommendation = 'Refer for assessment by a drug allergy specialist.';
        } else if (reactionTime === 'morethan5years' && risk !== 'High risk') {
            risk = 'Low risk';
            recommendation = 'Oral antibiotic, challenge with the same. Start with 1/10th dose and monitor for 20 minutes; full dose if no reaction and monitor for 1 hour.';
        }
    }

    // Check cutaneous symptoms and rash duration
    if ((cutaneous.includes('urticaria') || cutaneous.includes('pruritus') || cutaneous.includes('nonspecificRash') || cutaneous.includes('mpRash')) &&
        (rashDuration === '3-7days' || rashDuration === '7+days') && risk !== 'High risk') {
        risk = 'High risk';
        recommendation = 'Refer for assessment by a drug allergy specialist.';
    }

    // Check for gastrointestinal symptoms, thrush, other adverse events for very low risk
    if ((gastrointestinalSymptoms === 'yes' || thrush === 'yes' || otherAdverseEvent === 'yes') && risk !== 'High risk') {
        risk = 'Very low risk';
        recommendation = 'Directly delabel if patient agrees or perform 2-stage oral challenge.';
    }

    // Check for evidence of having tolerated culprit drug since reaction for no risk
    if (toleratedCulpritDrug === 'yes') {
        risk = 'No risk';
        recommendation = 'Directly delabel if patient agrees or perform 2-stage oral challenge.';
    }

    // Determine recommendation based on index penicillin memory and type
    if (indexPenicillin === 'yes' && risk !== 'High risk') {
        if (antibiotic === 'benzylpenicillin' || antibiotic === 'piperacillinTazobactam') {
            risk = 'Low risk';
            recommendation = 'IV antibiotic, seek a referral for complete evaluation.';
        } else if (antibiotic === 'amoxicillin' || antibiotic === 'amoxicillinClavulanate' || antibiotic === 'phenoxymethylpenicillin' || antibiotic === 'ampicillin' || antibiotic === 'dicloxacillin') {
            risk = 'Low risk';
            recommendation = 'Oral antibiotic, challenge with the same. Start with 1/10th dose and monitor for 20 minutes; full dose if no reaction and monitor for 1 hour.';
        }
    } else if (indexPenicillin === 'no' && risk !== 'High risk') {
        risk = 'Low risk';
        recommendation = 'Suggest amoxicillin. Start with 1/10th dose and monitor for 20 minutes; full dose if no reaction and monitor for 1 hour.';
    }

    document.getElementById('result').innerHTML = `<p><strong>Risk Assessment and Recommendation:</strong> ${risk}: ${recommendation}</p>`;
}

document.getElementById('indexPenicillin').addEventListener('change', function() {
    const antibioticTypeDiv = document.getElementById('antibioticType');
    if (this.value === 'yes') {
        antibioticTypeDiv.style.display = 'block';
    } else {
        antibioticTypeDiv.style.display = 'none';
    }
});

